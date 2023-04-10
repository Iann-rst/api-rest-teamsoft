import { CustomersRepository } from '@/repositories/customers-repository'
import { Customer } from '@prisma/client'
import { CustomerNotFound } from './erros/customer-not-found'

interface ResponseUpdateUseCase {
  updated_customer: Customer
}

interface RequestUpdateUseCase {
  cnpj: string
  nome_contato?: string
  tel?: string
}

export class UpdateUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    cnpj,
    nome_contato,
    tel,
  }: RequestUpdateUseCase): Promise<ResponseUpdateUseCase> {
    const customer = await this.customersRepository.findByCnpj(cnpj)

    if (!customer) {
      throw new CustomerNotFound()
    }

    const updated_customer = await this.customersRepository.update(cnpj, {
      nome_contato,
      tel,
    })

    return { updated_customer }
  }
}
