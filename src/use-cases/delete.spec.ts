import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteUseCase } from './delete'
import { CustomerNotFound } from './erros/customer-not-found'

/* Teste unitários usando Pattern - InMemoryTestDatabase => Martin Fowler */

let inMemoryCustomersRepository: InMemoryCustomersRepository
let inMemoryAddressesRepository: InMemoryAddressesRepository
let deleteUseCase: DeleteUseCase

describe('Delete UseCase', () => {
  beforeEach(() => {
    inMemoryAddressesRepository = new InMemoryAddressesRepository()
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    deleteUseCase = new DeleteUseCase(
      inMemoryCustomersRepository,
      inMemoryAddressesRepository,
    )
  })

  it('should be able to remove customer and their addresses', async () => {
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

    await deleteUseCase.execute(createdCustomer.cnpj)

    const customer = await inMemoryCustomersRepository.findByCnpj(
      createdCustomer.cnpj,
    )

    const addresses =
      await inMemoryAddressesRepository.listAllAddressesByCustomerCnpj(
        createdCustomer.cnpj,
      )

    expect(customer).toEqual(null)
    expect(addresses).toEqual(null)
  })

  it('should not be able to remove customer and their addresses with wrong cnpj', async () => {
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

    const cnpj = 'Wrong CNPJ'
    await expect(() => deleteUseCase.execute(cnpj)).rejects.toBeInstanceOf(
      CustomerNotFound,
    )
  })
})
