import express, { Request, Response } from "express";
import { app } from "../../server.user";
import { AdminController } from "../controller/admin.ctrl";
import { adminCtrl } from "../core/admin-core";
import { customerCtrl } from "../core/customer-core";

// Reusable error handling middleware
function errorHandler(err: Error, req: Request, res: Response, next: any) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

export default function runServer() {
  const router = express.Router();

  // User registration route
  router.post('/register', async (req: Request, res: Response) => {
    try {
      // Validate input data here if needed.

      await adminCtrl.insertCtrl({
        email: req.body.email,
        numberPhone: req.body.numberPhone,
        password: req.body.password,
        createdAt: undefined,
        updatedAt: undefined,
      });

      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  });

  // Customer registration route
  router.post('/register_customer', async (req: Request, res: Response) => {
    try {
      // Validate input data here if needed.

      const user = await customerCtrl.insertCtrl({
        numberPhone: req.body.numberPhone,
        password: req.body.password,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
      });

      // return res.status(201).json(user).send();
      console.log(user)
      return res.status(200).json({
        message: "customer created with success",
        user: user,
      });
    } catch (error) {
      next(error.message); // Pass the error to the error handling middleware
      res.send(error.message).json();
      console.log(error.message);

    }
  });

  // Login route
  router.post('/login', async (req: Request, res: Response) => {
    try {
      // Validate input data here if needed.

      const adminAuthResult = await adminCtrl.authCtrl({
        email: req.body.email,
        password: req.body.password,
      });

      res.status(200).json(adminAuthResult);
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  });

  // Add the router and error handling middleware to the app
  app.use('/', router);
  app.use(errorHandler);
}
function next(error: any) {
  console.log(error)
}

