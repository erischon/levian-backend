import { passportGoogle } from "../../auth";

it("tests that the Passport middleware is created successfully", () => {
  expect(passportGoogle).toBeDefined();
});
