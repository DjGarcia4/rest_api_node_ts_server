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
