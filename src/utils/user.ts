import prisma from "../lib/prisma";
import { User } from "@prisma/client";

/**
 * Fetches all users from the database.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

/**
 * Fetches a single user from the database by their ID.
 *
 * @param id The ID of the user to retrieve.
 * @returns A promise that resolves to a User object, or null if no user is found.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Fetches a single user from the database by their ID, including their associated accounts.
 *
 * @param id The ID of the user to retrieve.
 * @returns A promise that resolves to a User object, or null if no user is found.
 */
export const getUserByIdWithAccount = async (
  id: string
): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
    include: { accounts: true },
  });
};

/**
 * Fetches a single user from the database by their ID, including their associated posts.
 *
 * @param id The ID of the user to retrieve.
 * @returns A promise that resolves to a User object, or null if no user is found.
 */
export const getUserByIdWithPosts = async (
  id: string
): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
};
