import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 *@swagger
 *components:
 *     schemas:
 *        Product:
 *            Type: object
 *            properties:
 *                id:
 *                    type: integer
 *                    description: The product ID
 *                    example: 1
 *                name:
 *                    type: string
 *                    description: The product name
 *                    example: Monitor curvo de 49 Pulgadas
 *                price:
 *                    type: number
 *                    description: The product price
 *                    example: 300
 *                availability:
 *                    type: boolean
 *                    description: The product availability
 *                    example: true
 */

/**
 *@swagger
 * /api/products:
 *     get:
 *      summary: Get a list of products
 *      tags:
 *        - Products
 *      description: Return a list of products
 *      responses:
 *        200:
 *          description: Successfull response
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);
//Routing
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no Válido"),
  handleInputErrors,
  getProductById
);
router.post(
  "/",

  body("name")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no Válido")
    .notEmpty()
    .withMessage("El prceio del Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErrors,
  createProduct
);
router.put(
  "/:id",
  param("id").isInt().withMessage("ID no Válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("Valor no Válido")
    .notEmpty()
    .withMessage("El prceio del Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no Válido"),
  handleInputErrors,
  updateAvailability
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no Válido"),
  handleInputErrors,
  deleteProduct
);

export default router;
