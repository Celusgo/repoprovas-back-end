import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { clearDatabase } from "../utils/database";
import { createTest } from "../factories/testFactory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /send", () => {
  it("should answer with 201 when sending right params to create a test", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send(createTest('2017.1', 'P2', 'Jorge Bria', 'Cálculo I', link));
    expect(request.status).toEqual(201);
  });

  it("should answer with 400 when sending empty body", async () => {
    const request = await supertest(app).post("/send").send({});
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when sending empty name", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send(createTest('', 'P2', 'Jorge Bria', 'Cálculo I', link));
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when sending empty category", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send(createTest('2017.1', '', 'Jorge Bria', 'Cálculo I', link));
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when sending empty teacher", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send(createTest('2017.1', 'P2', '', 'Cálculo I', link));
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when sending empty subject", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send(createTest('2017.1', 'P2', 'Jorge Bria', '', link));
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when sending empty link", async () => {
    const link =  '';
    const request = await supertest(app).post("/send").send(createTest('2017.1', 'P2', 'Jorge Bria', 'Cálculo I', link));
    expect(request.status).toEqual(400);
  });

  it("should answer with 406 when sending invalid subject", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send(createTest('2017.1', 'invalid', 'Jorge Bria', 'Cálculo I', link));
    expect(request.status).toEqual(406);
  });

  it("should answer with 406 when sending non-existing teacher", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send(createTest('2017.1', 'P2', 'non-existing', 'Cálculo I', link));
    expect(request.status).toEqual(406);
  });

  it("should answer with 406 when sending non-existing subject", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send(createTest('2017.1', 'P2', 'Jorge Bria', 'non-existing', link));
    expect(request.status).toEqual(406);
  });

  it("should answer with 400 when sending non-string category", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send({name:'2017.1', category: 3, teacher:'Jorge Bria', subject:'Cálculo I', link});
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when sending non-string teacher", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send({name:'2017.1', category: 'P2', teacher: 3, subject:'Cálculo I', link});
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when sending non-string subject", async () => {
    const link =  'https://drive.google.com/file/d/1PGEKb9ZXoDb17XkDhj1a5yCOsZSR9oFi/view?usp=sharing';
    const request = await supertest(app).post("/send").send({name:'2017.1', category: 'P2', teacher:'Jorge Bria', subject: 3, link});
    expect(request.status).toEqual(400);
  });

  it("should answer with 400 when sending non-string link", async () => {
    const request = await supertest(app).post("/send").send({name:'2017.1', category: 'P2', teacher:'Jorge Bria', subject:'Cálculo I', link: 3});
    expect(request.status).toEqual(400);
  });
  
});