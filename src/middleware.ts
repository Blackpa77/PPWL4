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

//PRAKTIKUM 5
  .get(
    "/admin",
    () => {
      return { stats: 99 };
    },
    {
      beforeHandle({ headers, set }) {
        if (headers.authorization !== "Bearer 123") {
          set.status = 401;
          return {
            success: false,
            message: "Unauthorized",
          };
        }
      },
    }
  )