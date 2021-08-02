import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /disciplines/:id", () => {
  it("should answer with 200 and an object when successfully getting information from an existing subject id", async () => {
    const request = await supertest(app).get("/disciplines/1");
    expect(request.body).toEqual(expect.any(Array));
  });

  it("should answer with an empty array when trying to get information from an non-existing subject id", async () => {
    const request = await supertest(app).get("/disciplines/999999");
    expect(request.body).toEqual([]);
  });

  it("should answer with 400 if id is not a number", async () => {
    const request = await supertest(app).get("/disciplines/NaN");
    expect(request.status).toEqual(400);
  });
});
