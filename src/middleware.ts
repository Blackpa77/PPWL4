import { Elysia, t } from "elysia";

const app = new Elysia()


  .onRequest(({ request, set }) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    if (request.headers.get("x-test") === "block") {
      set.status = 403;
      return "Blocked"; 
    }
  })


  .get("/hello", () => "Hello Middleware")


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

  .get(
    "/product",
    () => {
      return { id: 1, name: "Laptop" }; 
    },
    {
      afterHandle({ response }) {
        return {
          success: true,
          data: response, 
        };
      },
    }
  )

  .post(
    "/login",
    ({ body }) => {
      return { success: true, message: "Login OK" };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 1 }),
      }),
    }
  )
  .onError(({ code, set }) => {
    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        error: "Validation Error",
      };
    }
  })
  .listen(3000);

console.log(`🦊 Elysia middleware server is running at ${app.server?.hostname}:${app.server?.port}`);