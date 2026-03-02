import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())
  .post(
    "/request",
    ({ body }) => {
      return {
        message: "Success",
        data: body,
      };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" }),
        age: t.Number({ minimum: 18 }),
      }),
    }
  )

  .get(
    "/products/:id",
    ({ params, query }) => {
      return {
        message: "Product fetched",
        id: params.id,
        sort: query.sort,
      };
    },
    {
      params: t.Object({
        id: t.Numeric(), 
      }),
      query: t.Object({
        sort: t.Union([t.Literal("asc"), t.Literal("desc")]), 
      }),
    }
  )

  .get(
    "/stats",
    () => {
      return {
        total: 150,
        active: 45,
      };
    },
    {
      response: t.Object({
        total: t.Number(),
        active: t.Number(),
      }),
    }
  )
  .listen(3000);

console.log(`🦊 Elysia validation server is running at ${app.server?.hostname}:${app.server?.port}`);