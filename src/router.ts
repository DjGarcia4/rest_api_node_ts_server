import { Router } from "express";
import { createProduct } from "./handlers/product";

const router = Router();
//Routing
router.get("/", (req, res) => {
  res.send("Hola Mundo desde get");
});
router.post("/", createProduct);
router.delete("/", (req, res) => {
  res.send("Hola Mundo delete");
});
router.put("/", (req, res) => {
  res.send("Hola Mundo put");
});

export default router;
