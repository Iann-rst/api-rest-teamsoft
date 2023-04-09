export class CustomerWithCorporateNameAlreadyExists extends Error {
  constructor() {
    super('Não foi possível cadastrar o cliente. Razão Social já está em uso!')
  }
}
