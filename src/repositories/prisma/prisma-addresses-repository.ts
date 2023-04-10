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
    await prisma.address.deleteMany({
      where: {
        customer_cnpj,
      },
    })
  }

  async listAllAddressesByCustomerCnpj(
    customer_cnpj: string,
  ): Promise<Address[] | null> {
    const addresses = await prisma.address.findMany({
      where: {
        customer_cnpj,
      },
    })

    return addresses
  }
}
