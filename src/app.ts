import express from 'express'
import { routes } from './http/routes'

const app = express()
app.use(express.json())
app.use(routes)

export { app }
