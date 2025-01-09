import { FastifyInstance, FastifyPluginOptions } from "fastify";
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
}
