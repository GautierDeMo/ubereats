import 'dotenv/config'
import express /**, { type Request, type Response } */ from "express";
import { v1Route } from './routes/v1';
import { jsonApiResponseMiddleware } from './middlewares/v1';

if (process.env.NODE_ENV !== 'production') {
  console.log('🔧 Chargement config...');
  console.log('   - DB_PORT :', process.env.DB_PORT);
  console.log('   - DB URL loaded :', !!process.env.DATABASE_URL);
  console.log('.  - NODE_ENV :', process.env.NODE_ENV);
  console.log('   - PORT :', process.env.PORT);
}

const app = express();

// Middleware pour pouvoir gérer les requêtes avec du json
app.use(express.json());

// Lorsque l'on reçoit des formulaires via méthode POST en 'multipart/form-data'
app.use(express.urlencoded({ extended: true }));

// Utilisation de notre middleware pour exporter des méthodes pour success et error
app.use(jsonApiResponseMiddleware);

app.use('/v1', v1Route);


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

app.listen(8000, () => console.log('✅ Server is running on port 8000'));
