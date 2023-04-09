import { Props } from '@/http/controllers/register'
import { AddressesRepository } from '@/repositories/addresses-repository'
import { CustomersRepository } from '@/repositories/customers-repository'
import { CustomerWithCnpjAlreadyExists } from './erros/customer-with-cnpj-already-exists'
import { CustomerWithCorporateNameAlreadyExists } from './erros/customer-with-corporate-name-already-exists'

export class RegisterUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private addressesRepository: AddressesRepository,
  ) {} // repository de addresses // repository de customers

  async execute({ cnpj, nome_contato, razao_social, tel, addresses }: Props) {
    // Não deve ser possível criar cliente que tenha o mesmo cnpj
    // Não deve ser possível criar cliente que tenho a mesma razao_social

    const customerWithSameCnpj = await this.customersRepository.findByCnpj(cnpj)
    if (customerWithSameCnpj) {
      throw new CustomerWithCnpjAlreadyExists()
    }

    const customerWithSameCorporateName =
      await this.customersRepository.findByRazaoSocial(razao_social)
    if (customerWithSameCorporateName) {
      throw new CustomerWithCorporateNameAlreadyExists()
    }

    const customer = await this.customersRepository.create({
      cnpj,
      nome_contato,
      razao_social,
      tel,
    })

    if (customer) {
      // Apos criar cliente, adicionar os endereços na tabela de endereço. Passando o cnpj do cliente

      // Adicionar o cnpj do cliente para cada endereço (chave estrangeira da tabela endereço)
      const new_data = addresses.map((address) => {
        return { ...address, customer_cnpj: customer.cnpj }
      })
      await this.addressesRepository.create(new_data)
    } else {
      throw new Error('Não foi possível cadastrar o cliente')
    }
  }
}