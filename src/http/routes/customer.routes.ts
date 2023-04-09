import { Router } from 'express'

export const customerRoutes = Router()

customerRoutes.get('/register', (request, response) => {
  return response.status(202).json({
    message: 'Registrar cliente',
  })
})

customerRoutes.get('/:cnpj/details', (request, response) => {
  return response.status(200).json({
    message: 'Bem vindo',
  })
})
