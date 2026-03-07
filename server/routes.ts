import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

<<<<<<< HEAD
export async function registerRoutes(app: Express): Promise<Server> {
=======
export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
>>>>>>> 2088e20 (Initial commit)
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

<<<<<<< HEAD
  const httpServer = createServer(app);

=======
>>>>>>> 2088e20 (Initial commit)
  return httpServer;
}
