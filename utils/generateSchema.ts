import { JsonValue, JsonObject } from "../types/index.ts";

// Function to generate JSON schema
export function generateSchema(obj: JsonValue): JsonObject {
  if (Array.isArray(obj)) {
    return {
      type: "array",
      items: obj.length > 0 ? generateSchema(obj[0]) : {}
    };
  } else if (typeof obj === "object" && obj !== null) {
    const schema: JsonObject = {
      type: "object",
      properties: {},
      required: []
    };
    for (const [key, value] of Object.entries(obj)) {
      schema.properties[key] = generateSchema(value);
      schema.required.push(key); // Assuming all properties are required; adjust if needed
    }
    return schema;
  } else if (typeof obj === "string") {
    return { type: "string" };
  } else if (typeof obj === "number") {
    return { type: "number" };
  } else if (typeof obj === "boolean") {
    return { type: "boolean" };
  } else {
    return { type: "null" };
  }
}
