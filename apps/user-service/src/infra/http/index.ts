import express, { Request, Response } from "express";
import { app } from "../../server.user";
import { AdminController } from "../controller/admin.ctrl";
import { adminCtrl } from "../core/admin-core";




export default function runServer() {

  app.post('/register', async (req: Request, res: Response) => {
    const { email, numberPhone, password } = req.body;

    const Input = {
      password: password as string,
      email: email as string,
      numberPhone: numberPhone as string,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    try {
      await adminCtrl.insertCtrl(Input)

    } catch (error) {
      console.log(error)
    }


  })


  app.post('/login', async (req: Request, res: Response) => {
    const { uuid, email, numberPhone, password } = req.body;

    const Input = {
      uuid: uuid as string,
      password: password as string,
      email: email as string,


    }
    try {
      await adminCtrl.authCtrl(Input)

    } catch (error) {
      console.log(error)
    }


  })
}



