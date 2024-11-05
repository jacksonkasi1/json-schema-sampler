// Define types for JSON data and schema
export type JsonObject = Record<string, any>;
export type JsonValue = JsonObject | any[] | string | number | boolean | null;

export interface SampleConfig {
  maxStringLength: number;
}


/**
 * Interface for filesystem errors with relevant properties.
 */
export interface FileSystemError extends Error {
  name: string;
  message: string;
}
