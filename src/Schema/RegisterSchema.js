import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod.string().nonempty("name is required").min(3, "name must be at least 3 characters").max(50, "name must be less than 50 characters"),
    username: zod
      .string()
      .nonempty("username is required")
      .min(3, "name must be at least 3 characters")
      .max(50, "name must be less than 50 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "username can only contain letters, numbers, and underscores"),
    email: zod.string().nonempty("email is required").email("Please enter a valid email address"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain an uppercase letter, lowercase letter, and number"),
    rePassword: zod
      .string("Please confirm your password")
      .nonempty("Please confirm your password")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain an uppercase letter, lowercase letter, and number"),
    dateOfBirth: zod
      .string()
      .nonempty("Birth date is required")
      .date()
      .refine((userData) => {
        return new Date().getFullYear() - new Date(userData).getFullYear() >= 18;
      }, "Age should be at least 18 years old"),
    gender: zod
      .string()
      .nonempty("gender is required")
      .regex(/(male|female)/, "invalid gender choice"),
  })
  .refine(
    (obj) => {
      return obj.password === obj.rePassword;
    },
    { path: ["rePassword"], message: "Passwords do not match" },
  );