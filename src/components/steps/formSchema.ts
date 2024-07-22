import { z } from "zod"

const formSchema = z.object({
  // Step 1: User Details
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  subject: z.enum(['Resume', 'Portfolio', 'Project'], {
    required_error: "Please select a subject.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),

  // Step 2: Date and Time Selection
  date: z.date({
    required_error: "Please select a date.",
    invalid_type_error: "That's not a valid date!",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),

  // Step 3: Document Upload
  document: z.instanceof(File, { message: "Please upload a document." })
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (file) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      "Only .pdf, .doc, and .docx files are accepted."
    ),
})

export type FormValues = z.infer<typeof formSchema>

export default formSchema