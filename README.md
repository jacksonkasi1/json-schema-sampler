# JSON Schema Sampler

A Deno-based CLI tool to analyze JSON files and extract either a structural schema or a minimal sample of the data. This tool is useful for quickly understanding the structure of a large JSON file or getting a summarized view with minimal data.

## Features

- **Extract Schema**: Generates a structural schema of the JSON, showing key types and nested structures.
- **Generate Sample Data**: Creates a trimmed sample of the JSON file, including a subset of large strings and arrays for easier readability.

## Getting Started

### Prerequisites

- **Deno**: Ensure Deno is installed. You can install it from [https://deno.land/](https://deno.land/).

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/jacksonkasi1/json-schema-sampler.git
cd json-schema-sampler
```

### Usage

1. Place the JSON file you want to analyze in the project directory (e.g., `data.json`).
2. Run the script with the following command:

   ```bash
   deno run --allow-read main.ts
   ```

3. Follow the on-screen prompts to select an option:

   - **Option 1**: Extracts the schema structure.
   - **Option 2**: Generates a minimal sample data view.

### Example Output

#### Sample JSON (`data.json`)

```json
{
  "name": "Alice",
  "age": 30,
  "isEmployed": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "postalCode": 12345
  },
  "skills": [
    {
      "name": "JavaScript",
      "experience": 5
    }
  ]
}
```

#### Extracted Schema (Option 1)

```
Object {}
  name:
    string
  age:
    number
  isEmployed:
    boolean
  address:
    Object {}
      street:
        string
      city:
        string
      postalCode:
        number
  skills:
    Array [1 items]
      Object {}
        name:
          string
        experience:
          number
```

#### Generated Sample Data (Option 2)

```json
{
  "name": "Alice",
  "age": 30,
  "isEmployed": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "postalCode": 12345
  },
  "skills": [
    {
      "name": "JavaScript",
      "experience": 5
    }
  ]
}
```

### Configuration

- **File Path**: Modify `filePath` in `main.ts` to specify the JSON file path.
- **Max String Length**: Adjust `maxStringLength` in `generateSample` to set the maximum length of strings in sample data.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
