import { CustomersRepository } from '../customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  async findByCnpj(cnpj: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findByRazaoSocial(razao_social: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(cnpj: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async create(data: object): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
