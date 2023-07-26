import { Application, Request, Response } from "express";

import { customerModel } from "../project";

const customerHandlers = {
  createCustomer: async (req: Request, res: Response) => {
    try {
      const customer = await customerModel.create(req.body);

      res.status(201).json(customer);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getCustomers: async (req: Request, res: Response) => {
    try {
      const customers = await customerModel.find({ user: req.params.user });

      res.status(200).json(customers);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  getCustomerById: async (req: Request, res: Response) => {
    try {
      const customer = await customerModel.findById(req.params.id);

      res.status(200).json(customer);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  updateCustomer: async (req: Request, res: Response) => {
    try {
      const customer = await customerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json(customer);
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
  deleteCustomer: async (req: Request, res: Response) => {
    try {
      await customerModel.findByIdAndDelete(req.params.id);

      res.status(200).send("Customer deleted");
    } catch (err: any) {
      res.status(400).send(err.message);
    }
  },
};

function customerRoutes(app: Application) {
  app.get("/api/customers/:user", customerHandlers.getCustomers);
  app.get("/api/customers/:id", customerHandlers.getCustomerById);
  app.post("/api/customers", customerHandlers.createCustomer);
  app.put("/api/customers/:id", customerHandlers.updateCustomer);
  app.delete("/api/customers/:id", customerHandlers.deleteCustomer);
}

export { customerRoutes };
