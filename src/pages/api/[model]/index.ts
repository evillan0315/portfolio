import { NextApiRequest, NextApiResponse } from "next";
import prisma, { handler } from "@/lib/prisma"; // Import the centralized handler
import { PrismaModelKeys } from "@/types/dynamic";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function dynamicApiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const operation = req.method;
  const { model } = req.query;
  const session = await getServerSession(req, res, authOptions); // Get session for the request

  console.log(session, `${model} api ${operation}`);
  if (!session && model !== "layout") {
    return res.status(401).json({ error: "Unauthorized" }); // If no session, respond with Unauthorized
  }
  // Extract the model name from the URL
  // Map HTTP methods to operations
  let data = req.method === "GET" ? req.query : req.body; // Use query for GET and body for other methods
  console.log(data);
  if (
    typeof model !== "string" ||
    !Object.keys(prisma).includes(String(model))
  ) {
    return res.status(400).json({ error: "Invalid model name." });
  }

  try {
    // Map HTTP methods to Prisma operations
    let operationName:
      | "findMany"
      | "findFilterMany"
      | "create"
      | "update"
      | "delete"
      | "findUnique";
    switch (operation) {
      case "GET":
        if (req.query.pageId) {
          operationName = "findFilterMany";
        } else {
          operationName = req.query.id ? "findUnique" : "findMany";
        }
        break;
      case "POST":
        if (data.id || data.id === "" || data.id === null) {
          delete data.id;
        }
        console.log(data);
        operationName = "create";
        break;
      case "PUT":
        operationName = "update";
        break;
      case "DELETE":
        operationName = "delete";
        break;

      default:
        return res.status(405).json({ error: "Method not allowed." });
    }

    // Call the centralized handler
    const result = await handler(model as PrismaModelKeys, operationName, data);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in dynamic API route:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
}
