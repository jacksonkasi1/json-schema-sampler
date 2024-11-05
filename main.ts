// ** import utils
import { generateSchema } from "./utils/generateSchema.ts";
import { extractSchema } from "./utils/extractSchema.ts";
import { generateSample } from "./utils/generateSample.ts";

// ** import types
import { JsonObject, type FileSystemError } from "./types/index.ts";

/**
 * Main function to handle JSON processing and output.
 * This function prompts the user to choose between extracting the JSON schema, generating sample data, or creating a JSON Schema file.
 */
async function main() {
  const filePath = "./data.json"; // Replace with your JSON file path
  const outputDir = "./output"; // Directory for storing output files

  // Create the output directory if it doesn't exist
  try {
    await Deno.mkdir(outputDir, { recursive: true });
  } catch (error: unknown) {
    const fsError = error as FileSystemError;
    if (fsError.name !== "AlreadyExists") {
      console.error("Error: Failed to create output directory.", error);
      return;
    }
  }

  // Attempt to read and parse JSON data
  /** @type {JsonObject} The parsed JSON data */
  let jsonData: JsonObject;
  try {
    // Read the JSON file and parse it
    const text = await Deno.readTextFile(filePath);
    jsonData = JSON.parse(text);
  } catch (error) {
    console.error("Error: Unable to read or parse JSON file.", error);
    return;
  }

  // Prompt user for action choice
  console.log("Choose an option:\n1. Extract Schema\n2. Generate Sample Data\n3. Generate JSON Schema");
  const option = prompt("Enter 1, 2, or 3:");

  // Handle user selection with validation
  if (option === "1") {
    try {
      // Extract the schema structure from the JSON data
      const schemaOutput = extractSchema(jsonData);
      // Write the schema structure to a text file in the output directory
      await Deno.writeTextFile(`${outputDir}/schema_output.txt`, schemaOutput);
      console.log("Schema structure has been written to output/schema_output.txt");
    } catch (error) {
      console.error("Error: Failed to write schema structure to file.", error);
    }
  } else if (option === "2") {
    try {
      // Generate a minimal sample from the JSON data
      const sampleData = generateSample(jsonData);
      // Write the sample data to a JSON file in the output directory
      await Deno.writeTextFile(`${outputDir}/sample_data.json`, JSON.stringify(sampleData, null, 2));
      console.log("Sample data has been written to output/sample_data.json");
    } catch (error) {
      console.error("Error: Failed to write sample data to file.", error);
    }
  } else if (option === "3") {
    try {
      // Generate a JSON schema for the JSON data
      const jsonSchema = generateSchema(jsonData);
      jsonSchema["$schema"] = "http://json-schema.org/draft-07/schema#"; // Specify the schema draft version
      jsonSchema["title"] = "Generated schema for Root"; // Set a title for the schema
      // Write the JSON schema to a JSON file in the output directory
      await Deno.writeTextFile(`${outputDir}/json_schema.json`, JSON.stringify(jsonSchema, null, 2));
      console.log("JSON schema has been written to output/json_schema.json");
    } catch (error) {
      console.error("Error: Failed to write JSON schema to file.", error);
    }
  } else {
    console.error("Invalid option. Please enter 1, 2, or 3.");
  }
}

await main();
