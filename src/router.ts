import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
//Routing
router.get("/", getProducts);
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
router.delete("/", (req, res) => {
  res.send("Hola Mundo delete");
});

export default router;
