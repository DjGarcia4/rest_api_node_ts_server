import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("Should display validation error", async () => {
    const res = await request(server).post("/api/products").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(4);
    expect(res.status).not.toBe(404);
    expect(res.body.error).not.toHaveLength(2);
  });

  it("Should validate that the price is greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Mouse - Testing",
      price: 0,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(1);
    expect(res.status).not.toBe(404);
    expect(res.body.error).not.toHaveLength(2);
  });

  it("Should validate that the price is a number and greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Mouse - Testing",
      price: "Holaa",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(2);
    expect(res.status).not.toBe(404);
    expect(res.body.error).not.toHaveLength(3);
  });

  it("Should create a new product", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Mouse - Testing",
      price: 50,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.status).not.toBe(200);
    expect(res.status).not.toBe(400);
    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("error");
  });
});

describe("GET  /api/products", () => {
  it("Should check if api/products url exists", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).not.toBe(404);
  });
  it("Get a JSON response with products", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveLength(1);
    expect(res.body).not.toHaveProperty("error");
  });
});

describe("GET  /api/products/:id", () => {
  it("Should return 404 response for a non-existent product", async () => {
    const prudctId = 2000;
    const res = await request(server).get(`/api/products/${prudctId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Producto no Encontrado");
  });
  it("Should check a valid ID in the URL", async () => {
    const res = await request(server).get(`/api/products/not-valid-url`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(1);
    expect(res.body.error[0].msg).toBe("ID no Válido");
  });
  it("Get a JSON response for a single product", async () => {
    const prudctId = 1;
    const res = await request(server).get(`/api/products/${prudctId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).not.toHaveProperty("error");
  });
});

describe("PUT  /api/products/:id", () => {
  it("Should check a valid ID in the URL", async () => {
    const res = await request(server)
      .put(`/api/products/not-valid-url`)
      .send({ name: "Monitor - Actualizado", price: 300, availability: true });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(1);
    expect(res.body.error[0].msg).toBe("ID no Válido");
  });
  it("Should display validation error messages when updating a product", async () => {
    const prudctId = 1;
    const res = await request(server).put(`/api/products/${prudctId}`).send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(5);
  });
  it("Should validate that the price is a number and greater than 0", async () => {
    const prudctId = 1;
    const res = await request(server)
      .put(`/api/products/${prudctId}`)
      .send({ name: "Monitor - Actualizado", price: -500, availability: true });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(1);
    expect(res.body.error[0].msg).toBe("Precio no válido");
  });
  it("Should return a 404 response for a non-existent product", async () => {
    const prudctId = 100;
    const res = await request(server)
      .put(`/api/products/${prudctId}`)
      .send({ name: "Monitor - Actualizado", price: 500, availability: true });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");

    expect(res.body.error).toBe("Producto no Encontrado");
  });
  it("Should update an existing product with valid data", async () => {
    const prudctId = 1;
    const res = await request(server)
      .put(`/api/products/${prudctId}`)
      .send({ name: "Monitor - Actualizado", price: 500, availability: true });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("PATCH  /api/products/:id", () => {
  it("Should check a valid ID in the URL", async () => {
    const res = await request(server).patch(`/api/products/not-valid-url`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(1);
    expect(res.body.error[0].msg).toBe("ID no Válido");
  });
  it("Should return a 404 response for a non-existent product", async () => {
    const prudctId = 100;
    const res = await request(server).patch(`/api/products/${prudctId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");

    expect(res.body.error).toBe("Producto no Encontrado");
  });
  it("Should update the product availability", async () => {
    const prudctId = 1;
    const res = await request(server).patch(`/api/products/${prudctId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("DELETE  /api/products/:id", () => {
  it("Should check a valid ID in the URL", async () => {
    const res = await request(server).delete(`/api/products/not-valid-url`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toHaveLength(1);
    expect(res.body.error[0].msg).toBe("ID no Válido");
  });
  it("Should return a 404 response for a non-existent product", async () => {
    const prudctId = 100;
    const res = await request(server).delete(`/api/products/${prudctId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");

    expect(res.body.error).toBe("Producto no Encontrado");
  });
  it("Should delete a product with valid data", async () => {
    const prudctId = 1;
    const res = await request(server).delete(`/api/products/${prudctId}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toBe("Producto Eliminado");
  });
});
