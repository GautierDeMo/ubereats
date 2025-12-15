import express, { type Request, type Response } from "express";
import { AdminRoute } from "./routes/admin.routes";

const app = express();
// Middleware pour pouvoir gérer les requêtes avec du json
app.use(express.json());

// Lorsque l'on reçoit des formulaires via méthode POST en 'multipart/form-data'
// app.use(express.urlencoded({ extended: true }));

app.use('/admin', AdminRoute);


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
