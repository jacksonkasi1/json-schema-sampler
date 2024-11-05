import { JsonValue } from "../types/index.ts";

// Function to display schema structure
export function extractSchema(obj: JsonValue, indent = ""): string {
  let schemaOutput = "";
  if (Array.isArray(obj)) {
    schemaOutput += `${indent}Array [${obj.length} items]\n`;
    if (obj.length > 0) {
      schemaOutput += extractSchema(obj[0], indent + "  ");
    }
  } else if (typeof obj === "object" && obj !== null) {
    schemaOutput += `${indent}Object {}\n`;
    for (const [key, value] of Object.entries(obj)) {
      schemaOutput += `${indent}  ${key}:\n`;
      schemaOutput += extractSchema(value, indent + "    ");
    }
  } else {
    schemaOutput += `${indent}${typeof obj}\n`;
  }
  return schemaOutput;
}
