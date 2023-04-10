import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AddressesNotFound } from './erros/addresses-not-found'
import { CustomerNotFound } from './erros/customer-not-found'
import { SearchUseCase } from './search'

/* Teste unitários usando Pattern - InMemoryTestDatabase => Martin Fowler */

let inMemoryCustomersRepository: InMemoryCustomersRepository
let inMemoryAddressesRepository: InMemoryAddressesRepository
let searchUseCase: SearchUseCase

describe('Search UseCase', () => {
  beforeEach(() => {
    inMemoryAddressesRepository = new InMemoryAddressesRepository()
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    searchUseCase = new SearchUseCase(
      inMemoryCustomersRepository,
      inMemoryAddressesRepository,
    )
  })

  it('should be able to search customer and their addresses', async () => {
    const createdCustomer = await inMemoryCustomersRepository.create({
      cnpj: 'CNPJ TEST',
      nome_contato: 'John Doe',
      razao_social: 'John Doe LTDA',
      tel: 'xxxxxxxx',
    })

    const createdAddresses = [
      {
        logradouro: 'Rua Test 1',
        numero: 10,
        complemento: '',
        bairro: 'Bairro Test 1',
        cidade: 'Cidade Test 1',
        estado: 'Estado Test 1',
        cep: '00000-01',
        customer_cnpj: createdCustomer.cnpj,
      },
    ]

    await inMemoryAddressesRepository.create(createdAddresses)

    const { customer, addresses } = await searchUseCase.execute(
      createdCustomer.cnpj,
    )

    expect(customer.nome_contato).toEqual('John Doe')
    expect(addresses).toHaveLength(1)
    expect(addresses).toEqual([
      expect.objectContaining({ logradouro: 'Rua Test 1' }),
    ])
    expect(addresses[0].id).toEqual(expect.any(String))
  })

  it('should not be able to search customer and their addresses with wrong cnpj', async () => {
    const cnpj = 'CNPJ Inexistente'
    await expect(() => searchUseCase.execute(cnpj)).rejects.toBeInstanceOf(
      CustomerNotFound,
    )
  })

  it('should not be able to search customer and their addresses with wrong customer_cnpj (addresses)', async () => {
    // simular a criação de um cliente e endereços de um cliente 2, e tentar listar com o cnpj do primeiro cliente

    const cnpj = 'CNPJ TEST'

    await inMemoryCustomersRepository.create({
      cnpj: 'CNPJ TEST',
      nome_contato: 'John Doe',
      razao_social: 'John Doe LTDA',
      tel: 'xxxxxxxx',
    })

    const createdAddresses = [
      {
        logradouro: 'Rua Test 1',
        numero: 10,
        complemento: '',
        bairro: 'Bairro Test 1',
        cidade: 'Cidade Test 1',
        estado: 'Estado Test 1',
        cep: '00000-01',
        customer_cnpj: 'CNPJ CLIENTE 2',
      },
    ]

    await inMemoryAddressesRepository.create(createdAddresses)

    await expect(() => searchUseCase.execute(cnpj)).rejects.toBeInstanceOf(
      AddressesNotFound,
    )
  })
})
