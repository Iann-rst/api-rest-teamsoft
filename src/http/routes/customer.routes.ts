import { Router } from 'express'
import { deleteController } from '../controllers/delete'
import { register } from '../controllers/register'
import { search } from '../controllers/search'
import { update } from '../controllers/update'

export const customerRoutes = Router()

customerRoutes.post('/register', register)

customerRoutes.delete('/:cnpj/delete', deleteController)

customerRoutes.get('/:cnpj/details', search)

customerRoutes.put('/:cnpj/update', update)
