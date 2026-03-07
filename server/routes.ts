import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

<<<<<<< HEAD
<<<<<<< HEAD
export async function registerRoutes(app: Express): Promise<Server> {
=======
=======
>>>>>>> main
export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
<<<<<<< HEAD
>>>>>>> 2088e20 (Initial commit)
=======
>>>>>>> main
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

<<<<<<< HEAD
<<<<<<< HEAD
  const httpServer = createServer(app);

=======
>>>>>>> 2088e20 (Initial commit)
=======
>>>>>>> main
  return httpServer;
}
