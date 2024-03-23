import { z } from "zod";

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;

export const cvDataSchema = z.object({
  personalInformation: z
    .object({
      firstName: z.string().min(1, { message: "First name must not be empty" }),
      lastName: z.string().min(1, { message: "Last name must not be empty" }),
      phoneNumber: z.string().refine((phone) => phoneRegex.test(phone), {
        message: "Phone number is not valid",
      }),
      email: z
        .string()
        .email({ message: "Provide a valid email address" })
        .min(1, { message: "Email must not be empty" }),
      address: z.object({
        street: z.string().min(1, { message: "Street must not be empty" }),
        city: z.string().min(1, { message: "City must not be empty" }),
        state: z.string().min(1, { message: "State must not be empty" }),
        postCode: z.string().min(1, { message: "Post code must not be empty" }),
        country: z.string().min(1, { message: "Country must not be empty" }),
      }),
    })
    .refine(
      (data) =>
        data.firstName.length <= 50 &&
        data.lastName.length <= 50 &&
        data.phoneNumber.length <= 50 &&
        data.email.length <= 50 &&
        data.address.street.length <= 50 &&
        data.address.city.length <= 50 &&
        data.address.state.length <= 50 &&
        data.address.postCode.length <= 50 &&
        data.address.country.length <= 50,
      {
        message: "Input must be less than 50 characters",
      }
    ),
  education: z.array(
    z.object({
      schoolName: z
        .string()
        .min(1, { message: "School name must not be empty" }),
      areaOfStudy: z
        .string()
        .min(1, { message: "Area of study must not be empty" }),
      qualification: z.string().min(1, {
        message: "Qualification must not be empty",
      }),
      startDate: z.string().min(1, { message: "Start date must not be empty" }),
      endDate: z.string().min(1, { message: "End date must not be empty" }),
      honours: z.string().optional(),
    })
  ),
  workExperience: z.array(
    z.object({
      employerName: z.string().min(1, {
        message: "Employer name must not be empty",
      }),
      jobTitle: z.string().min(1, { message: "Job title must not be empty" }),
      duties: z
        .array(z.string())
        .min(1, { message: "Duties must not be empty" }),
      startDate: z.string().min(1, { message: "Start date must not be empty" }),
      endDate: z.string().min(1, { message: "End date must not be empty" }),
    })
  ),
  references: z.array(
    z.object({
      referenceName: z.string().min(1, {
        message: "Reference name must not be empty",
      }),
      referenceJobTitle: z.string().min(1, {
        message: "Reference job title must not be empty",
      }),
      referenceEmail: z.string().min(1, {
        message: "Reference email must not be empty",
      }),
      referencePhoneNumber: z.string().min(1, {
        message: "Reference phone number must not be empty",
      }),
    })
  ),
  photo: z.string().optional(),
  language: z.array(z.string()).optional(),
  summary: z.string().min(1, { message: "Summary must not be empty" }),
});

export type CvData = z.infer<typeof cvDataSchema>;
