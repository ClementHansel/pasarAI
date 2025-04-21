// src/app/api/markets/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DELETE, GET, POST, PUT } from "../products/route";

const prisma = new PrismaClient();

GET // GET endpoint to fetch all markets
PUT // PUT endpoint to update a market
POST // POST endpoint to create a new market
DELETE // DELETE endpoint to delete a market


