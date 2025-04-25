import { Prisma } from "@prisma/client";
import { db } from "../db/db";

// Get a single account by ID

export const getAccountById = async (id: string) => {
  try {
    return await db.account.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching account by ID:", error);
    throw new Error("Failed to retrieve account.");
  }
};

// Get a single account by email

export const getAccountByEmail = async (email: string) => {
  try {
    return await db.account.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error fetching account by email:", error);
    throw new Error("Failed to retrieve account.");
  }
};

// Create a new account
export const createAccount = async (data: Prisma.AccountCreateInput) => {
  try {
    return await db.account.create({
      data,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Failed to create account.");
  }
};

// Update an existing account

export const updateAccount = async (
  id: string,
  data: Prisma.AccountUpdateInput
) => {
  try {
    return await db.account.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    throw new Error("Failed to update account.");
  }
};

// Delete an account

export const deleteAccount = async (id: string) => {
  try {
    return await db.account.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    throw new Error("Failed to delete account.");
  }
};
