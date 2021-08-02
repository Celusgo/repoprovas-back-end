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

describe("GET /teachers/:teacherId/:id", () => {
  it("should answer with 200 when teacherId and subjectId is valid", async () => {
    const request = await supertest(app).get("/teachers/2/1");
    expect(request.status).toEqual(200);
  });

  it("should answer with 400 when teacherId is invalid", async () => {
    const request = await supertest(app).get("/teachers/invalid/1");
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when subjectId is invalid", async () => {
    const request = await supertest(app).get("/teachers/1/invalid");
    expect(request.status).toEqual(400);
  });
});
