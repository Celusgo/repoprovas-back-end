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

describe("GET /inicio", () => {
  it("should answer with 200 when getting period, teacher and subject options for the homepage", async () => {
    const request = await supertest(app).get("/inicio");
    expect(request.body).toEqual(expect.any(Object));
  });
});
