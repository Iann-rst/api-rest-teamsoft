export class CustomerWithCnpjAlreadyExists extends Error {
  constructor() {
    super('Não foi possível cadastrar o cliente. CNPJ já está em uso!')
  }
}
