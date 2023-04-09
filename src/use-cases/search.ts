import { AddressesRepository } from '@/repositories/addresses-repository'
import { CustomersRepository } from '@/repositories/customers-repository'
import { AddressesNotFound } from './erros/addresses-not-found'
import { CustomerNotFound } from './erros/customer-not-found'

export class SearchUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute(cnpj: string) {
    // Mostrar as informações do Cliente e seus endereços
    // Só deve ser possível mostrar as informações de um Cliente que existe
    // Só deve ser possível listar Endereços que existe com o customer_cnpj do cliente

    const customer = await this.customersRepository.findByCnpj(cnpj)

    if (!customer) {
      throw new CustomerNotFound()
    }

    const addresses =
      await this.addressesRepository.listAllAddressesByCustomerCnpj(cnpj)

    if (!addresses) {
      throw new AddressesNotFound()
    }

    return { customer, addresses }
  }
}
