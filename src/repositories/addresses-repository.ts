/*
 **** Interface de contrato para os repositórios de Clientes
 **** Repository-in-memory e Prisma repository devem implementar esse contrato
 */

export interface AddressesRepository {
  create(data: object): Promise<void>
  deleteAddressesByCustomerCnpj(customer_cnpj: string): Promise<void>
  listAllAddressesByCustomerCnpj(customer_cnpj: string): Promise<void>
}
