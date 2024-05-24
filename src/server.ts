import colors from "colors";
import express from "express";
import router from "./router";
import db from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

//Conectar a BDD
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.bgGreen.bold("Conexion exitosa a la DB"));
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
}

connectDB();
//Instancia de Express
const server = express();

//Leer datos de formulario
server.use(express.json());
server.use("/api/products", router);
//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
