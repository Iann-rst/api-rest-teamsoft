import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CustomerNotFound } from './erros/customer-not-found'
import { UpdateUseCase } from './update'

/* Teste unitários usando Pattern - InMemoryTestDatabase => Martin Fowler */

/* Atualizar apenas as informações do cliente (nome do contato, telefone) */

let inMemoryCustomersRepository: InMemoryCustomersRepository
let updateUseCase: UpdateUseCase

describe('Update Customer UseCase', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    updateUseCase = new UpdateUseCase(inMemoryCustomersRepository)
  })

  it('should be able to update customer information', async () => {
    const createdCustomer = await inMemoryCustomersRepository.create({
      cnpj: 'CNPJ TEST',
      nome_contato: 'John Doe',
      razao_social: 'John Doe LTDA',
      tel: '+55999999999',
    })

    const customer = {
      cnpj: createdCustomer.cnpj,
      nome_contato: 'John',
      tel: '+55999992121',
    }

    const { updated_customer } = await updateUseCase.execute(customer)

    expect(updated_customer.tel).toEqual(customer.tel)
    expect(updated_customer.nome_contato).toEqual(customer.nome_contato)
  })

  it('should not be able to update customer with wrong cnpj', async () => {
    const customer = {
      cnpj: 'CNPJ Inexistente',
      nome_contato: 'John',
      tel: '+55999992121',
    }

    expect(() => updateUseCase.execute(customer)).rejects.toBeInstanceOf(
      CustomerNotFound,
    )
  })
})
