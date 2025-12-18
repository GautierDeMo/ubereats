import express /**, { type Request, type Response } */ from "express";
import { v1Route } from './routes/v1';
import { errorHandlerMiddleware, jsonApiResponseMiddleware } from './middlewares/v1';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "../docs/swagger.config";
import swaggerUi from "swagger-ui-express";

if (process.env.NODE_ENV !== 'production') {
  console.log('🔧 Chargement config...')
  console.log('   - DB_PORT :', process.env.DB_PORT)
  console.log('   - DB URL loaded :', !!process.env.DATABASE_URL)
  console.log('.  - NODE_ENV :', process.env.NODE_ENV)
  console.log('   - PORT :', process.env.PORT)
}

const app = express()

// get swaggerConfig
const swaggerSpec = swaggerJSDoc(swaggerOptions)

// Middleware for requests with a application/json Content-type
app.use(express.json())

/** Middleware for requests with a 'application/x-www-form-urlencoded' Content-type:
 * lorsque les données des formulaires sont passés sous forme de query params
 * dans l'url. Et pas en POST avec du JSON
 */
app.use(express.urlencoded({ extended: true }))

// Utilisation de notre middleware pour exporter des méthodes pour success et error
app.use(jsonApiResponseMiddleware)

// v1 de notre API
app.use('/v1', v1Route)
// endpoint de notre doc d'api
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// every error not handled in the code will be handle by the errorMiddleware to help us debug
app.use(errorHandlerMiddleware)


// Endpoints avant de faire les routers, et les controllers, etc...
// app.get('/', (req: Request, res: Response) => {
//   const query = req.query;
//   return res.json({ queries: query })
// });

// app.post('/', (req: Request, res: Response) => {
//   const body = req.body;
//   return res.json(body);
// });

// app.put('/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   return res.json(id);
// });

app.listen(8000, () => console.log('✅ Server is running on port 8000'))
