/*
 **** Interface de contrato para os repositórios de Clientes
 **** Repository-in-memory e Prisma repository devem implementar esse contrato
 */

import { Customer, Prisma } from '@prisma/client'

export interface CustomersRepository {
  findByCnpj(cnpj: string): Promise<Customer | null>
  findByRazaoSocial(razao_social: string): Promise<Customer | null>
  delete(cnpj: string): Promise<void>
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
  update(cnpj: string, data: Prisma.CustomerUpdateInput): Promise<Customer>
}
