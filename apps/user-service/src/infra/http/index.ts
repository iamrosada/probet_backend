import express, { Request, Response } from "express";
import { app } from "../../server.user";
import { AdminController } from "../controller/admin.ctrl";
import { adminCtrl } from "../core/admin-core";
import { customerCtrl } from "../core/customer-core";
import { ensureAuthenticated } from "../core/middlewares/ensureAuthenticated";
import { TokenService } from "../core/auth-global-core";

// Reusable error handling middleware
function errorHandler(err: Error, req: Request, res: Response, next: any) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}

export default function runServer() {
  const router = express.Router();
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

  router.post('/register_customer_oob', async (req: Request, res: Response) => {
    try {
      // Validate input data here if needed.

      const user = await customerCtrl.insertOnlyOneBetCtrl(
        req.body.numberPhone,
      );

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

  // Customer verify route
  router.post('/verify-code', async (req: Request, res: Response) => {
    try {
      // Validate input data here if needed.

      const user = await customerCtrl.authCtrl(
        {
          password: req.body.password,
          numberPhone: req.body.numberPhone
        }
      );

      // return res.status(201).json(user).send();
      console.log(user)
      return res.status(200).json({
        message: "customer authenticated with success",
        user: user,
      });
    } catch (error) {
      next(error.message); // Pass the error to the error handling middleware
      res.send(error.message).json();
      console.log(error.message);

    }
  });


  // Customer login route
  router.post('/login_customer', async (req: Request, res: Response) => {
    try {
      // Validate input data here if needed.

      const user = await customerCtrl.authCtrl(
        {
          password: req.body.password,
          numberPhone: req.body.numberPhone
        }
      );

      // return res.status(201).json(user).send();
      console.log(user)
      return res.status(200).json({
        message: "customer authenticated with success",
        user: user,
      });
    } catch (error) {
      next(error.message); // Pass the error to the error handling middleware
      res.send(error.message).json();
      console.log(error.message);

    }
  });

  router.post('/login_customer_oob', async (req: Request, res: Response) => {
    try {
      // Validate input data here if needed.

      const user = await customerCtrl.authExpireIn24Ctrl(
        req.body.numberPhone
      );

      // return res.status(201).json(user).send();
      console.log(user)
      return res.status(200).json({
        message: "customer authenticated with success",
        user: user,
      });
    } catch (error) {
      next(error.message); // Pass the error to the error handling middleware
      res.send(error.message).json();
      console.log(error.message);

    }
  });

  router.get('/list_customers', ensureAuthenticated, async (req: Request, res: Response) => {
    try {

      const user = await customerCtrl.FindAllCustomerCtrl();

      return res.status(200).json({
        message: "got all customers with success",
        user: user,
      });
    } catch (error) {
      next(error.message); // Pass the error to the error handling middleware
      res.send(error.message).json();
      console.log(error.message);

    }
  });

  router.get('/customer/:id', async (req, res, next) => {
    try {
      const userId = req.params.id; // Access the ID from the route parameters
      const user = await customerCtrl.FindByIdCtrl(userId);

      if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      return res.status(200).json({
        message: "Got customer by ID with success",
        user: user,
      });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
      console.log(error.message);
    }
  });


  router.get('/find_by_number_phone', async (req: Request, res: Response) => {

    try {

      const user = await customerCtrl.FindCustomerByPhoneNumberCtrl(
        req.body.numberPhone
      );

      if (!user) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      return res.status(200).json({
        message: "Got customer by Phone with success",
        user: user,
      });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
      //return res.status(500).json({ error: "Internal Server Error", message: error.message }); // Handle errors gracefully
    }
  });


  router.post("/refresh_token", async (req, res) => {
    try {
      const refreshToken = new TokenService();
      const token = await refreshToken.refreshTokenController(req.body.refresh_token);
      return res.json({ token }); // Assuming you want to send the token as a JSON response
    } catch (error) {
      console.error("Error refreshing token:", error);
      return res.status(500).json({ error: "Internal Server Error", message: error.message }); // Handle errors gracefully
    }
  });
  // Login route


  // Add the router and error handling middleware to the app
  app.use('/', router);
  app.use(errorHandler);
}
function next(error: any) {
  console.log(error)
}

