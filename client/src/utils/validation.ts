import { z, ZodError } from "zod";

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;

export const educationObject = z
  .object({
    schoolName: z.string().min(1, { message: "School name must not be empty" }),
    areaOfStudy: z
      .string()
      .min(1, { message: "Area of study must not be empty" }),
    schoolLocation: z
      .string()
      .min(1, { message: "School location must not be empty" }),
    qualification: z
      .string()
      .min(1, { message: "Qualification must not be empty" }),
    honours: z.string().optional(),
    startDate: z
      .union([
        z.string().min(1, { message: "Please select a start date" }),
        z.date({
          required_error: "Please select a start date",
          invalid_type_error: "Invalid date!",
        }),
      ])
      .refine(
        (value) => {
          if (
            value instanceof Date ||
            (typeof value === "string" && value.trim() !== "")
          ) {
            return true;
          } else {
            return false;
          }
        },
        {
          message: "Please select a start date",
        }
      ),
    endDate: z
      .union([
        z.string().min(1, { message: "Please select an end date" }),
        z.date({
          required_error: "Please select an end date",
          invalid_type_error: "Invalid date!",
        }),
      ])
      .refine(
        (value) => {
          // Check if the value is a valid date or a non-empty string
          if (
            value instanceof Date ||
            (typeof value === "string" && value.trim() !== "")
          ) {
            return true;
          } else {
            return false;
          }
        },
        {
          message: "Field must be a valid date or a non-empty string",
        }
      ),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (endDate instanceof Date) {
      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date must be after start date",
          path: ["endDate"],
        });
      }
    }
  });

export const workExperienceObject = z
  .object({
    employerName: z.string().min(1, {
      message: "Employer name must not be empty",
    }),
    jobTitle: z.string().min(1, { message: "Job title must not be empty" }),
    location: z.string().optional(),
    duties: z
      .array(z.string())
      .nonempty({ message: "The duties must not be empty" }),
    // .min(1, { message: "The Job details must not be empty" }),
    startDate: z
      .union([
        z.string().min(1, { message: "Please select a start date" }),
        z.date({
          required_error: "Please select a start date",
          invalid_type_error: "Invalid date!",
        }),
      ])
      .refine(
        (value) => {
          if (
            value instanceof Date ||
            (typeof value === "string" && value.trim() !== "")
          ) {
            return true;
          } else {
            return false;
          }
        },
        {
          message: "Please select a start date",
        }
      ),
    endDate: z
      .union([
        z.string().min(1, { message: "Please select an end date" }),
        z.date({
          required_error: "Please select an end date",
          invalid_type_error: "Invalid date!",
        }),
      ])
      .refine(
        (value) => {
          if (
            value instanceof Date ||
            (typeof value === "string" && value.trim() !== "")
          ) {
            return true;
          } else {
            return false;
          }
        },
        {
          message: "Field must be a valid date or a non-empty string",
        }
      ),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (endDate instanceof Date) {
      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date must be after start date",
          path: ["endDate"],
        });
      }
    }
  });

export const certificationObject = z.object({
  certName: z
    .string()
    .min(1, { message: "Certification name must not be empty" }),
  certIssueOrganisation: z
    .string()
    .min(1, { message: "Issue organisation must not be empty" }),
  certDate: z
    .union([
      z.string().min(1, { message: "Please select a certification date" }),
      z.date({
        required_error: "Please select a start date",
        invalid_type_error: "Invalid date!",
      }),
    ])
    .refine(
      (value) => {
        if (
          value instanceof Date ||
          (typeof value === "string" && value.trim() !== "")
        ) {
          return true;
        } else {
          return false;
        }
      },
      {
        message: "Please select a certification date",
      }
    ),
});

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

  education: z.array(educationObject),
  workExperience: z.array(workExperienceObject),
  skills: z
    .array(z.string().min(1))
    .min(1, { message: "Please add at least one skill" }),
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
  summary: z
    .string()
    .min(10, { message: "Summary must be a minimum of 10 characters" }),
  certifications: z.array(certificationObject),
});

export type CvData = z.infer<typeof cvDataSchema>;
