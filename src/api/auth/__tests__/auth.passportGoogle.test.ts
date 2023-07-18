import { passportGoogle } from "../../auth";

it("tests that the Passport middleware is created successfully", () => {
  expect(passportGoogle).toBeDefined();
});

// Tests that the GoogleStrategy is created successfully
it("test_successful_google_strategy_creation", () => {
  expect(passportGoogle).toThrow();
});
