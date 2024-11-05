import { JsonValue, JsonObject, SampleConfig } from "../types/index.ts";

// Function to generate a minimal sample
export function generateSample(obj: JsonValue, config: SampleConfig = { maxStringLength: 20 }): JsonValue {
  const { maxStringLength } = config;

  if (Array.isArray(obj)) {
    return obj.length > 0 ? [generateSample(obj[0], config)] : [];
  } else if (typeof obj === "object" && obj !== null) {
    const sample: JsonObject = {};
    for (const [key, value] of Object.entries(obj)) {
      sample[key] = generateSample(value, config);
    }
    return sample;
  } else if (typeof obj === "string") {
    return obj.length > maxStringLength ? obj.slice(0, maxStringLength) + "..." : obj;
  } else {
    return obj;
  }
}
