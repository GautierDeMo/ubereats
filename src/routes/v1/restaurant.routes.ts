import { Router } from "express";
import { getProfile, login, updateRestaurant, updateServiceAvailable } from "../../controllers/v1";
import { authenticationMiddleware } from "../../middlewares/v1";


const router = Router();

// Lorsque tu ne mets pas de controller, ce qui est moins propre, mais possible
// router.post('/restaurant/create', (req: Request, res: Response) => {
//   blablablabalbalab
// });

router.post('/login', login);
router.use(authenticationMiddleware);
router.get('/profile', getProfile);
router.patch('/update', updateRestaurant)
router.patch('/available', updateServiceAvailable)

export {router as RestaurantRoute};
