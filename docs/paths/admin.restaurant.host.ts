/**
 * @swagger
 * /admin/restaurant/create:
 *   post:
 *     summary: Enregistrer un nouveau restaurant
 *     description: Permet à un administrateur d’ajouter un restaurant à la base de données.
 *     tags:
 *       - Restaurants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRestaurantDtoInputs'
 *     responses:
 *       201:
 *         description: Restaurant créé avec succès
 *       409:
 *         description: Un restaurant avec cet email ou nom existe déjà
 *       400:
 *         description: Données de requête invalides
 */
