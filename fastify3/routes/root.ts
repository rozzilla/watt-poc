import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { request } from "undici";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
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
    async () => {
      const host1 = "node3.plt.local";
      const host2 = "fastify2.plt.local";
      const host3 = "type1.plt.local";
      const host4 = "type4.plt.local";
      const result1 = request(`http://${host1}`);
      const result2 = request(`http://${host2}/live`);
      const result3 = request(`http://${host3}`);
      const result4 = request(`http://${host4}`);

      const result = await Promise.all([result1, result2, result3, result4]);
      const success = result.every(({ statusCode }) => statusCode === 200);
      return { success };
    }
  );
}
