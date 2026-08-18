import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.string().nonempty("email is required").email("Please enter a valid email address"),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain an uppercase letter, lowercase letter, and number"),
});
