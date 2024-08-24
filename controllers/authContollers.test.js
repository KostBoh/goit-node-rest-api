// import request from "supertest";

// import app from "../app.js";

// describe("test / Login Controller", () => {
//   beforeAll(() => {});

//   afterAll(() => {
//     app.close();
//   });

//   afterEach(async () => {});

//   test("login with correct data", async () => {
//     const loginData = {
//       email: "iii@gmail.com",
//       password: "123456",
//     };

//     const { status, body } = (await request(app).post("/api/auth/login")).send(
//       loginData
//     );
//     expect(status).toBe(201);

//     expect(body.email).toBe(loginData.email);
//   });
// });
