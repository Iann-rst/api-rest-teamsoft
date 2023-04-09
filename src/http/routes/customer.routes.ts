import { Router } from 'express'
import { register } from '../controllers/register'

export const customerRoutes = Router()

customerRoutes.post('/register', register)

customerRoutes.get('/:cnpj/details', (request, response) => {
  return response.status(200).json({
    message: 'Bem vindo',
  })
})
