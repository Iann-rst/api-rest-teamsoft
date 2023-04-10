import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CustomerWithCnpjAlreadyExists } from './erros/customer-with-cnpj-already-exists'
import { CustomerWithCorporateNameAlreadyExists } from './erros/customer-with-corporate-name-already-exists'
import { RegisterUseCase } from './register'

/* Teste unitários usando Pattern - InMemoryTestDatabase => Martin Fowler */

let inMemoryCustomersRepository: InMemoryCustomersRepository
let inMemoryAddressesRepository: InMemoryAddressesRepository
let registerUseCase: RegisterUseCase

describe('Register UseCase', () => {
  beforeEach(() => {
    inMemoryAddressesRepository = new InMemoryAddressesRepository()
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    registerUseCase = new RegisterUseCase(
      inMemoryCustomersRepository,
      inMemoryAddressesRepository,
    )
  })

  it('should be able to register a customer with 1 address', async () => {
    const registerDataCustomer = {
      cnpj: 'CNPJ Test',
      nome_contato: 'John Doe',
      razao_social: 'John Doe Test',
      tel: 'xxxxxxxxx',
      addresses: [
        {
          logradouro: 'Rua Test',
          numero: 10,
          complemento: '',
          bairro: 'Bairro Test',
          cidade: 'Cidade Test',
          estado: 'Estado Test',
          cep: '00000-00',
        },
      ],
    }

    const { customer, number_of_addressed_created } =
      await registerUseCase.execute(registerDataCustomer)

    expect(number_of_addressed_created).toEqual(1)
    expect(customer.cnpj).toEqual('CNPJ Test')
  })

  it('should be able to register a customer with multiple addresses', async () => {
    const registerDataCustomer = {
      cnpj: 'CNPJ Test',
      nome_contato: 'John Doe',
      razao_social: 'John Doe Test',
      tel: 'xxxxxxxxx',
      addresses: [
        {
          logradouro: 'Rua Test 1',
          numero: 10,
          complemento: '',
          bairro: 'Bairro Test 1',
          cidade: 'Cidade Test 1',
          estado: 'Estado Test 1',
          cep: '00000-01',
        },
        {
          logradouro: 'Rua Test 2',
          numero: 10,
          complemento: '',
          bairro: 'Bairro Test 2',
          cidade: 'Cidade Test 2',
          estado: 'Estado Test 2',
          cep: '00000-02',
        },
        {
          logradouro: 'Rua Test 3',
          numero: 10,
          complemento: '',
          bairro: 'Bairro Test 3',
          cidade: 'Cidade Test 3',
          estado: 'Estado Test 3',
          cep: '00000-03',
        },
      ],
    }

    const { number_of_addressed_created } = await registerUseCase.execute(
      registerDataCustomer,
    )

    expect(number_of_addressed_created).toEqual(3)
  })

  it('should not be able to register a customer with an existing cnpj', async () => {
    const registerDataCustomer = {
      cnpj: 'CNPJ Test',
      nome_contato: 'John Doe 1',
      razao_social: 'John Doe Test',
      tel: 'xxxxxxxxx',
      addresses: [
        {
          logradouro: 'Rua Test',
          numero: 10,
          complemento: null,
          bairro: 'Bairro Test',
          cidade: 'Cidade Test',
          estado: 'Estado Test',
          cep: '00000-00',
        },
      ],
    }

    await registerUseCase.execute(registerDataCustomer)

    const registerDataCustomer2 = {
      cnpj: 'CNPJ Test',
      nome_contato: 'John Doe 02',
      razao_social: 'John Doe Test 2',
      tel: 'xxxxxxxxx',
      addresses: [
        {
          logradouro: 'Rua Test 2',
          numero: 10,
          complemento: null,
          bairro: 'Bairro Test 2',
          cidade: 'Cidade Test 2',
          estado: 'Estado Test 2',
          cep: '00000-00',
        },
      ],
    }
    await expect(() =>
      registerUseCase.execute(registerDataCustomer2),
    ).rejects.toBeInstanceOf(CustomerWithCnpjAlreadyExists)
  })

  it('should not be able to register a customer with an existing razao_social (corporate name)', async () => {
    const registerDataCustomer = {
      cnpj: 'CNPJ Test',
      nome_contato: 'John Doe 1',
      razao_social: 'John Doe Test',
      tel: 'xxxxxxxxx',
      addresses: [
        {
          logradouro: 'Rua Test',
          numero: 10,
          complemento: null,
          bairro: 'Bairro Test',
          cidade: 'Cidade Test',
          estado: 'Estado Test',
          cep: '00000-00',
        },
      ],
    }

    const { customer } = await registerUseCase.execute(registerDataCustomer)

    const registerDataCustomer2 = {
      cnpj: 'CNPJ Test 2',
      nome_contato: 'John Doe 02',
      razao_social: customer.razao_social,
      tel: 'xxxxxxxxx',
      addresses: [
        {
          logradouro: 'Rua Test 2',
          numero: 10,
          complemento: null,
          bairro: 'Bairro Test 2',
          cidade: 'Cidade Test 2',
          estado: 'Estado Test 2',
          cep: '00000-00',
        },
      ],
    }
    await expect(() =>
      registerUseCase.execute(registerDataCustomer2),
    ).rejects.toBeInstanceOf(CustomerWithCorporateNameAlreadyExists)
  })
})
