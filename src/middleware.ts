import { Elysia, t } from "elysia";

const app = new Elysia()

  //PRAKTIKUM 4
  .onRequest(({ request, set }) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    if (request.headers.get("x-test") === "block") {
      set.status = 403;
      return "Blocked"; 
    }
  })
  .get("/hello", () => "Hello Middleware")