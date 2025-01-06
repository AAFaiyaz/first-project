import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name cannot exceed 20 characters')
    .regex(
      /^[A-Z][a-z]*$/,
      'First Name must start with an uppercase letter and contain only letters',
    )
    .min(1, 'First Name is required'),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z]+$/, 'Last Name must contain only alphabets')
    .min(1, 'Last Name is required'),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father Name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father Occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father Contact Number is required'),
  motherName: z.string().trim().min(1, 'Mother Name is required'),
  motherOccupation: z.string().trim().min(1, 'Mother Occupation is required'),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother Contact Number is required'),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local Guardian Name is required'),
  occupation: z.string().trim().min(1, 'Local Guardian Occupation is required'),
  contactNo: z
    .string()
    .trim()
    .min(1, 'Local Guardian Contact Number is required'),
  address: z.string().trim().min(1, 'Local Guardian Address is required'),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'others'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Invalid gender value',
  }),
  datOfBirth: z.string().optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  emergencyContactNumber: z
    .string()
    .min(1, 'Emergency Contact Number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional()
    .refine((val) => !!val, { message: 'Invalid blood group' }),
  presentAddress: z.string().min(1, 'Present Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required'),
  guardian: guardianValidationSchema,
  localGurdian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
