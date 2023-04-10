import { Address, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { AddressesRepository } from '../addresses-repository'

export class InMemoryAddressesRepository implements AddressesRepository {
  public addresses: Address[] = []

  async create(data: Prisma.AddressCreateManyInput[]): Promise<number> {
    const new_addresses = data.map((address) => {
      return {
        ...address,
        id: randomUUID(),
        complemento: address.complemento || null,
      }
    })

    this.addresses.push(...new_addresses)
    return new_addresses.length
  }

  async deleteAddressesByCustomerCnpj(customer_cnpj: string): Promise<void> {
    this.addresses = this.addresses.filter(
      (address) => address.customer_cnpj !== customer_cnpj,
    )
  }

  async listAllAddressesByCustomerCnpj(
    customer_cnpj: string,
  ): Promise<Address[] | null> {
    const addresses = this.addresses.filter(
      (address) => address.customer_cnpj === customer_cnpj,
    )

    if (addresses.length === 0) {
      return null
    }

    return addresses
  }
}
