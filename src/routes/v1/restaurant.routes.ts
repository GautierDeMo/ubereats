import { Router } from "express";
import { addFood, getProfile, login, updateCoverImages, updateRestaurant, updateServiceAvailable } from "../../controllers/v1";
import { authenticationMiddleware } from "../../middlewares/v1";


const router = Router();

// Lorsque tu ne mets pas de controller, ce qui est moins propre, mais possible
// router.post('/restaurant/create', (req: Request, res: Response) => {
//   blablablabalbalab
// });

router.post('/login', login)
router.use(authenticationMiddleware)
router.get('/profile', getProfile)
router.patch('/update', updateRestaurant)
router.patch('/available', updateServiceAvailable)
// possibilité de mettre le middleware au sein du router, ou dans la méthode appelée
router.patch('/profile/cover-images',/** uploadImagesMiddleware, */ updateCoverImages)
router.post('/foods', addFood)

export {router as RestaurantRoute};
