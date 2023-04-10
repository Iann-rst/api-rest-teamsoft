import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { CustomerNotFound } from '@/use-cases/erros/customer-not-found'
import { CustomerWithCorporateNameAlreadyExists } from '@/use-cases/erros/customer-with-corporate-name-already-exists'
import { UpdateUseCase } from '@/use-cases/update'
import { Request, Response } from 'express'
import { z } from 'zod'

const updateCustomerAndAddressesParamsSchema = z.object({
  cnpj: z.coerce.string().trim().nonempty(),
})

const bodySchema = z.object({
  nome_contato: z.string().optional(),
  tel: z.string().optional(),
})

export type IPropsUpdate = z.infer<
  typeof updateCustomerAndAddressesParamsSchema
> &
  z.infer<typeof bodySchema>

export async function update(request: Request, response: Response) {
  try {
    const { cnpj } = updateCustomerAndAddressesParamsSchema.parse(
      request.params,
    )

    const { nome_contato, tel } = bodySchema.parse(request.body)

    const customersRepository = new PrismaCustomersRepository()
    const updateUseCase = new UpdateUseCase(customersRepository)

    const customer = await updateUseCase.execute({
      cnpj,
      nome_contato,
      tel,
    })

    return response.status(201).send({
      customer,
    })
  } catch (error) {
    if (error instanceof CustomerNotFound) {
      return response.status(404).send({
        message: error.message,
      })
    }

    if (error instanceof CustomerWithCorporateNameAlreadyExists) {
      return response.status(409).send({
        message: error.message,
      })
    }
    console.log(error)
    throw error
  }
}
