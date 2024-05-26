const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Get status 200 and an Array with one Object", async () => {
        const {statusCode, body: cafes} = await request(server).get("/cafes").send()
        expect(statusCode).toBe(200)
        expect(cafes).toBeInstanceOf(Array)
        expect(cafes.length).toBeGreaterThanOrEqual(1)
    })

    it("Get 404 status with nonexistent id", async () => {
        const token = "TestToken"
        const idTest = "try"
        // Se setea el token 
        const {statusCode} = await request(server).delete(`/cafes/${idTest}`).set("Authorization", token).send()
        expect(statusCode).toBe(404)
    })

    it("Add a new cafe product and Get a 200 status code", async () => {
        const testObject = {
            id: 5,
            nombre: "café prueba"
        }

        const {statusCode, body:cafes} = await request(server).post("/cafes").send(testObject)
        expect(statusCode).toBe(201)
        expect(cafes).toContainEqual(testObject)
    })

    it("Get 400 status code with a different id path", async () => {
        const newId = 2
        const testObject = {
            id: `${newId}+1`,
            nombre: "café prueba"
        }
        const {statusCode} = await request(server).put(`/cafes/${newId}`).send(testObject)
        expect(statusCode).toBe(400)
    })
});
