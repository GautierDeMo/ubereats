import { /** Request, Response, */ Router } from "express";
import { getRestaurantById, getRestaurants, registerRestaurant } from "../../controllers/v1";


const router = Router();

// Lorsque tu ne mets pas de controller, ce qui est moins propre, mais possible
// router.post('/restaurant/create', (req: Request, res: Response) => {
//   blablablabalbalab
// });

router.post('/restaurant/create', registerRestaurant);
router.get('/restaurant', getRestaurants);
router.get('/restaurant/:id', getRestaurantById);


export {router as AdminRoute}
