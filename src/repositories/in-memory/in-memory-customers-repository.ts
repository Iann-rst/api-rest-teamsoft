import { Customer, Prisma } from '@prisma/client'
import { CustomersRepository } from '../customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = []

  async findByCnpj(cnpj: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.cnpj === cnpj)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByRazaoSocial(razao_social: string): Promise<Customer | null> {
    const customer = this.customers.find(
      (customer) => customer.razao_social === razao_social,
    )

    if (!customer) {
      return null
    }

    return customer
  }

  async delete(cnpj: string): Promise<void> {
    this.customers = this.customers.filter((customer) => customer.cnpj !== cnpj)
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    const customer = {
      cnpj: data.cnpj,
      razao_social: data.razao_social,
      nome_contato: data.nome_contato,
      tel: data.tel,
    }

    this.customers.push(customer)

    return customer
  }

  async update(
    cnpj: string,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.cnpj === cnpj,
    )

    const customer = {
      cnpj,
      razao_social: data.razao_social as string,
      nome_contato: data.nome_contato as string,
      tel: data.tel as string,
    }
    this.customers[customerIndex] = customer

    return this.customers[customerIndex]
  }
}
