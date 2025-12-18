/**
 * @swagger
 * /restaurant/profile:
 *   get:
 *     summary: Récupérer le profil du restaurant connecté
 *     tags:
 *       - Restaurants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations du restaurant récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantProfileResponse'
 *       401:
 *         description: Token manquant ou invalide
 */

/**
 * ajouter un 'deprecated: true'
 * dans l'annotation '@swagger', juste après la méthode, au même niveau que
 * 'summary' met un style sur l'endpoint de l'API pour faire comprendre le fait
 * qu'elle n'est plus, ou ne sera plus utilisable.
 */
