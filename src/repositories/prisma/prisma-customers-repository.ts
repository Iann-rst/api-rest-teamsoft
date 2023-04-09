import { prisma } from '@/lib/prisma'
import { CustomersRepository } from '@/repositories/customers-repository'
import { Customer, Prisma } from '@prisma/client'

export class PrismaCustomersRepository implements CustomersRepository {
  async findByCnpj(cnpj: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        cnpj,
      },
    })
    return customer
  }

  async findByRazaoSocial(razao_social: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        razao_social,
      },
    })

    return customer
  }

  async delete(cnpj: string): Promise<void> {
    await prisma.customer.delete({
      where: {
        cnpj,
      },
    })
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    const customer = await prisma.customer.create({
      data,
    })
    return customer
  }
}
