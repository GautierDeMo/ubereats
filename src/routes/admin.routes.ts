import { /** Request, Response, */ Router } from "express";
import { getRestaurantById, getRestaurants, registerRestaurant } from "../controller/admin.controller";

const router = Router();

// Lorsque tu ne mets pas de controller, ce qui est moins propre, mais possible
// router.post('/restaurant/create', (req: Request, res: Response) => {
//   blablablabalbalab
// });

router.post('/restaurant/create', registerRestaurant);
router.post('/restaurant/', getRestaurants);
router.post('/restaurant/:id', getRestaurantById);

export {router as AdminRoute}
