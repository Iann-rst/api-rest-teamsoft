import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { CustomerNotFound } from '@/use-cases/erros/customer-not-found'
import { SearchUseCase } from '@/use-cases/search'
import { Request, Response } from 'express'
import { z } from 'zod'

const searchCustomerAndAddressesParamsSchema = z.object({
  cnpj: z.coerce.string().trim().nonempty(),
})

export async function search(request: Request, response: Response) {
  try {
    const { cnpj } = searchCustomerAndAddressesParamsSchema.parse(
      request.params,
    )

    const customersRepository = new PrismaCustomersRepository()
    const addressesRepository = new PrismaAddressesRepository()
    const searchUseCase = new SearchUseCase(
      customersRepository,
      addressesRepository,
    )

    const { customer, addresses } = await searchUseCase.execute(cnpj)

    return response.status(200).send({
      cliente: { ...customer },
      endereços: [...addresses],
    })
  } catch (error) {
    if (error instanceof CustomerNotFound) {
      return response.status(404).send({
        message: error.message,
      })
    }
    console.log(error)
    throw error
  }
}
