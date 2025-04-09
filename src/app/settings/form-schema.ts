import { z } from "zod";

export const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Title cannot be empty" }),
    dob: z.coerce.date().nullish(),
    gender: z.enum(["MALE", "FEMALE", "OTHERS"]).nullable(),
    experienceLevel: z.enum(["FRESHER", "INTERMEDIATE", "EXPERT"]).nullish(),
  })
  .required();
