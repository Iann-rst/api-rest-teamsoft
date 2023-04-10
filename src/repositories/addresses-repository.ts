/*
 **** Interface de contrato para os repositórios de Clientes
 **** Repository-in-memory e Prisma repository devem implementar esse contrato
 */

import { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
  create(data: Prisma.AddressCreateManyInput[]): Promise<number>
  deleteAddressesByCustomerCnpj(customer_cnpj: string): Promise<void>
  listAllAddressesByCustomerCnpj(
    customer_cnpj: string,
  ): Promise<Address[] | null>
}
