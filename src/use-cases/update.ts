import { IPropsUpdate } from '@/http/controllers/update'
import { CustomersRepository } from '@/repositories/customers-repository'
import { CustomerNotFound } from './erros/customer-not-found'
import { CustomerWithCorporateNameAlreadyExists } from './erros/customer-with-corporate-name-already-exists'

export class UpdateUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({ cnpj, nome_contato, razao_social, tel }: IPropsUpdate) {
    const customer = await this.customersRepository.findByCnpj(cnpj)

    if (!customer) {
      throw new CustomerNotFound()
    }
    // Não deve ser possível atualizar a razão social para uma que ja existe

    const customerWithSameCorporateName =
      await this.customersRepository.findByRazaoSocial(razao_social)

    if (customerWithSameCorporateName) {
      throw new CustomerWithCorporateNameAlreadyExists()
    }

    const updated_customer = await this.customersRepository.update(cnpj, {
      nome_contato,
      razao_social,
      tel,
    })

    return updated_customer
  }
}
