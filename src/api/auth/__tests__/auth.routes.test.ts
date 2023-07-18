import { Application } from "express";

import { authRoutes } from "../../auth";

it("test that the route handler for authenticating with Google is created successfully", () => {
  const app: Partial<Application> = {
    get: jest.fn(),
  };

  authRoutes(app as Application);

  expect(app.get).toHaveBeenCalledWith("/auth/google", expect.any(Function));
});
