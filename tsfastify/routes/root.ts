import { FastifyInstance } from "fastify";
import { Dispatcher, request, Agent } from "undici";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

const dispatcher = new Agent({ connect: { rejectUnauthorized: false } });

const checkAllServices = async (
  promises: Promise<Dispatcher.ResponseData<null>>[]
): Promise<boolean> =>
  (await Promise.all(promises)).every(async ({ statusCode, body }) => {
    await body.dump();
    return statusCode === 200;
  });

export default async function (fastify: FastifyInstance) {
  const typedFastify = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  typedFastify.get(
    "/check",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            includeAdmin: {
              type: "boolean",
              default: false,
            },
          },
        },
        response: {
          200: {
            type: "object",
            additionalProperties: false,
            properties: { result: { type: "string" } },
            required: ["result"],
          },
        },
      },
    },
    async (request) => {
      return { result: "value is " + request.query.includeAdmin };
    }
  );

  typedFastify.get(
    "/ipc",
    {
      schema: {
        response: {
          200: {
            type: "object",
            additionalProperties: false,
            properties: { success: { type: "boolean" } },
            required: ["success"],
          },
        },
      },
    },
    async () => ({
      success: await checkAllServices([
        request("http://fastify.plt.local/live"),
        request("http://node.plt.local/live"),
        request("http://typescript.plt.local/live"),
        request("http://ts2.plt.local/live"),
      ]),
    })
  );

  typedFastify.get(
    "/tcp",
    {
      schema: {
        response: {
          200: {
            type: "object",
            additionalProperties: false,
            properties: { success: { type: "boolean" } },
            required: ["success"],
          },
        },
      },
    },
    async () => ({
      success: await checkAllServices([
        request("http://127.0.0.1:3001/live"),
        request("http://127.0.0.1:3002/live"),
        request("http://127.0.0.1:3003/live"),
        request("http://127.0.0.1:3004/live"),
      ]),
    })
  );

  typedFastify.get(
    "/ssl",
    {
      schema: {
        response: {
          200: {
            type: "object",
            additionalProperties: false,
            properties: { success: { type: "boolean" } },
            required: ["success"],
          },
        },
      },
    },
    async () => ({
      success: await checkAllServices([
        request("https://127.0.0.1:4001/live", { dispatcher }),
        request("https://127.0.0.1:4002/live", { dispatcher }),
        request("https://127.0.0.1:4003/live", { dispatcher }),
        request("https://127.0.0.1:4004/live", { dispatcher }),
      ]),
    })
  );
}
