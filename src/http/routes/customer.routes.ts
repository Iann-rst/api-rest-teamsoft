import { Router } from 'express'
import { deleteController } from '../controllers/delete'
import { register } from '../controllers/register'
import { search } from '../controllers/search'

export const customerRoutes = Router()

customerRoutes.post('/register', register)

customerRoutes.delete('/:cnpj/delete', deleteController)

customerRoutes.get('/:cnpj/details', search)
