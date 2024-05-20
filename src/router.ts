import { Router } from "express";

const router = Router();
//Routing
router.get("/", (req, res) => {
  res.send("Hola Mundo desde get");
});
router.post("/", (req, res) => {
  res.send("Hola Mundo desde post");
});
router.delete("/", (req, res) => {
  res.send("Hola Mundo delete");
});
router.put("/", (req, res) => {
  res.send("Hola Mundo put");
});

export default router;
