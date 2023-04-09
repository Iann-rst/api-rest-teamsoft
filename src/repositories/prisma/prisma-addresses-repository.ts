import { prisma } from '@/lib/prisma'
import { AddressesRepository } from '@/repositories/addresses-repository'
import { Address, Prisma } from '@prisma/client'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressCreateManyInput[]): Promise<number> {
    const addresses = await prisma.address.createMany({
      data,
    })

    return addresses.count
  }

  async deleteAddressesByCustomerCnpj(customer_cnpj: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async listAllAddressesByCustomerCnpj(
    customer_cnpj: string,
  ): Promise<Address[] | null> {
    throw new Error('Method not implemented.')
  }
}
