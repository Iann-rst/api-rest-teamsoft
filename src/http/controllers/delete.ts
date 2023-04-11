import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { DeleteUseCase } from '@/use-cases/delete'
import { CustomerNotFound } from '@/use-cases/erros/customer-not-found'
import { Request, Response } from 'express'
import { z } from 'zod'

const deleteCustomerAndAddressesParamsSchema = z.object({
  cnpj: z.coerce.string().trim().nonempty(),
})

export async function deleteController(request: Request, response: Response) {
  try {
    const { cnpj } = deleteCustomerAndAddressesParamsSchema.parse(
      request.params,
    )

    const customersRepository = new PrismaCustomersRepository()
    const addressesRepository = new PrismaAddressesRepository()
    const deleteUseCase = new DeleteUseCase(
      customersRepository,
      addressesRepository,
    )

    await deleteUseCase.execute(cnpj)

    return response.status(200).json({
      message: 'Cliente removido com sucesso!',
    })
  } catch (error) {
    if (error instanceof CustomerNotFound) {
      return response.status(404).json({
        message: error.message,
      })
    }

    console.log(error)
    throw error
  }
}
