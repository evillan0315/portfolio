import { PrismaClient } from "@prisma/client";

// Initialize Prisma client
const prisma = new PrismaClient();
export default prisma;

// Type to extract model names from PrismaClient that support `findMany` operation
export type PrismaModelKeys = {
  [K in keyof PrismaClient]: PrismaClient[K] extends { findMany: Function }
    ? K
    : never;
}[keyof PrismaClient];

// List of valid models available in PrismaClient
const validModels: PrismaModelKeys[] = [
  "image",
  "component",
  "page",
  "navigation",
  "section",
  "form",
  "field",
  "formSection",
  "address",
  "account",
  "layout",
  "type",
  "category",
  "user",
  "role",
  "contact",
  "inquiry",
  "website",
  "profile",
  "resume",
  "company",
  "organization",
  "project",
  "social",
  "technology",
  "skills",
  "school",
  "degree",
  "education",
  "industry",
  "profession",
  "employment",
];

// Check if the model is valid (exists in the validModels list)
function isValidModel(model: string): model is PrismaModelKeys {
  return validModels.includes(model as PrismaModelKeys);
}

/**
 * Centralized handler for CRUD operations based on model and operation type
 * @param model - Model name (e.g., "user", "product")
 * @param operation - CRUD operation (e.g., "findMany", "create", etc.)
 * @param data - Data required for the operation (e.g., new record data or filter)
 */
export async function handler(
  model: PrismaModelKeys,
  operation:
    | "findMany"
    | "findFilterMany"
    | "findUnique"
    | "create"
    | "update"
    | "delete",
  data: any
) {
  // Ensure model is a valid string
  if (typeof model !== "string") {
    throw new Error(
      `Invalid model: ${model}. Model does not exist in Prisma Client.`
    );
  }

  try {
    // Check if the model is valid and exists in PrismaClient
    if (!Object.keys(prisma).includes(model) || !isValidModel(model)) {
      throw new Error(`Model ${model} does not exist in Prisma Client.`);
    }

    // Validate that data exists for create or update operations
    if ((operation === "create" || operation === "update") && !data) {
      throw new Error(`${operation} operation requires 'data' object.`);
    }

    // Dynamically select the Prisma model based on model name
    const prismaModel = prisma[model] as any;

    // Handle CRUD operations based on the operation type
    switch (operation) {
      case "findMany":
        return await prismaModel.findMany();
      case "findFilterMany":
        console.log(data);
        return await prismaModel.findMany({
          where: { pageId: data.pageId },
        });
      case "findUnique":
        if (!data?.id)
          throw new Error("findUnique operation requires 'id' in data.");
        return await prismaModel.findUnique({
          where: { id: data.id },
        });

      case "create":
        console.log(data, "prisma create");
        return await prismaModel.create({ data });

      case "update":
        console.log(data, "data");
        if (!data?.id)
          throw new Error("Update operation requires 'id' in data.");
        return await prismaModel.update({
          where: { id: data.id },
          data,
        });

      case "delete":
        if (!data?.id)
          throw new Error("Delete operation requires 'id' in data.");
        return await prismaModel.delete({
          where: { id: data.id },
        });

      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  } catch (error) {
    console.error("Error in dynamic API handler:", error);
    throw new Error("Error in dynamic API handler.");
  }
}
