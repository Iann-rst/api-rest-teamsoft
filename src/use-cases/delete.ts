import { AddressesRepository } from '@/repositories/addresses-repository'
import { CustomersRepository } from '@/repositories/customers-repository'
import { CustomerNotFound } from './erros/customer-not-found'

export class DeleteUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute(cnpj: string) {
    const customer = await this.customersRepository.findByCnpj(cnpj)

    if (!customer) {
      throw new CustomerNotFound()
    }

    await this.addressesRepository.deleteAddressesByCustomerCnpj(cnpj)
    await this.customersRepository.delete(cnpj)
  }
}
