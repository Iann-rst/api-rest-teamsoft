import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { CustomerWithCnpjAlreadyExists } from '@/use-cases/erros/customer-with-cnpj-already-exists'
import { CustomerWithCorporateNameAlreadyExists } from '@/use-cases/erros/customer-with-corporate-name-already-exists'
import { RegisterUseCase } from '@/use-cases/register'
import { Request, Response } from 'express'
import { z } from 'zod'

const addressSchema = z.object({
  logradouro: z
    .string({ required_error: 'Informe a Rua.' })
    .trim()
    .nonempty('Informe a rua.'),
  numero: z.number({
    required_error: 'Informe o número.',
    invalid_type_error: 'Informe um valor numérico',
  }),
  complemento: z.string().nullable(),
  bairro: z
    .string({ required_error: 'Informe o Bairro' })
    .trim()
    .nonempty('Informe o bairro.'),
  cidade: z
    .string({ required_error: 'Informe a Cidade.' })
    .trim()
    .nonempty('Informe a cidade.'),
  estado: z
    .string({ required_error: 'Informe o Estado.' })
    .trim()
    .nonempty('Informe o estado.'),
  cep: z
    .string({ required_error: 'Informe o CEP' })
    .trim()
    .nonempty('Informe o cep.'),
})

export type Address = z.infer<typeof addressSchema>

const bodySchema = z.object({
  cnpj: z
    .string({ required_error: 'Informe o CNPJ do Cliente' })
    .trim()
    .nonempty('Informe o CNPJ do Cliente'),

  razao_social: z
    .string({ required_error: 'Informe a Razão Social.' })
    .trim()
    .nonempty('Informe a Razão Social.'),

  nome_contato: z
    .string({ required_error: 'Informe o nome do contato.' })
    .trim()
    .nonempty('Informe o Nome do Contato.'),
  tel: z
    .string({ required_error: 'Informe o telefone de contato.' })
    .trim()
    .nonempty('Informe o telefone de contato.'),
  addresses: z.array(addressSchema).min(1, 'Informe pelo menos 1 endereço'),
})

export type Props = z.infer<typeof bodySchema>

export async function register(request: Request, response: Response) {
  try {
    const { cnpj, tel, nome_contato, razao_social, addresses } =
      bodySchema.parse(request.body)

    const customersRepository = new PrismaCustomersRepository()
    const addressesRepository = new PrismaAddressesRepository()

    const registerUseCase = new RegisterUseCase(
      customersRepository,
      addressesRepository,
    )

    await registerUseCase.execute({
      cnpj,
      nome_contato,
      razao_social,
      tel,
      addresses,
    })

    return response.status(201).send()
  } catch (error) {
    if (
      error instanceof CustomerWithCnpjAlreadyExists ||
      error instanceof CustomerWithCorporateNameAlreadyExists
    ) {
      return response.status(409).send({
        message: error.message,
      })
    }

    console.log(error)

    throw error
  }
}
