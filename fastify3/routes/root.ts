import { FastifyInstance } from "fastify";
import { Dispatcher, request } from "undici";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

const checkAllServices = async (
  promises: Promise<Dispatcher.ResponseData<null>>[]
): Promise<boolean> =>
  (await Promise.all(promises)).every(({ statusCode }) => statusCode === 200);

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
        request("http://fastify2.plt.local/live"),
        request("http://node3.plt.local"),
        request("http://type1.plt.local"),
        request("http://type4.plt.local"),
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
        request("https://127.0.0.1:3043/fastify/live"),
        request("https://127.0.0.1:3043/node"),
        request("https://127.0.0.1:3043/typescript"),
        request("https://127.0.0.1:3043/ts2"),
      ]),
    })
  );
}
