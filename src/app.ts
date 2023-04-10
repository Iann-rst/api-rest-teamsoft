import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'
import 'express-async-errors'
import { ZodError } from 'zod'
import { env } from './env'
import { routes } from './http/routes'

import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // Erro do tipo ZodError (validação dos campos: cnpj, razao social, telefone, nome contato, endereços)
    if (err instanceof ZodError) {
      return res.status(400).send({
        message: err.format(),
      })
    }

    if (env.NODE_ENV !== 'production') {
      console.error(err)
    }

    return res.status(500).send({ message: 'Internal server error.' })
  },
)

export { app }
