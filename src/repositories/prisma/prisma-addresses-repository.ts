import { AddressesRepository } from '@/repositories/addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: object): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deleteAddressesByCustomerCnpj(customer_cnpj: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async listAllAddressesByCustomerCnpj(customer_cnpj: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
