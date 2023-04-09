import { Router } from 'express'
import { deleteController } from '../controllers/delete'
import { register } from '../controllers/register'

export const customerRoutes = Router()

customerRoutes.post('/register', register)

customerRoutes.delete('/:cnpj/delete', deleteController)

customerRoutes.get('/:cnpj/details', (request, response) => {
  return response.status(200).json({
    message: 'Bem vindo',
  })
})
