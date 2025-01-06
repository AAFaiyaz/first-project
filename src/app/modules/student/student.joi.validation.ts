import Joi from 'Joi';
// creating a schema using joi
// UserName Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message('First Name must start with an uppercase letter')
    .required()
    .messages({
      'string.base': 'First Name must be a string',
      'string.max': 'First Name cannot exceed 20 characters',
      'any.required': 'First Name is required',
    }),
  middleName: Joi.string().trim().allow('', null),
  lastName: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .message('Last Name must contain only alphabets')
    .required()
    .messages({
      'string.base': 'Last Name must be a string',
      'any.required': 'Last Name is required',
    }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.base': 'Father Name must be a string',
    'any.required': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Father Occupation must be a string',
    'any.required': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.base': 'Father Contact Number must be a string',
    'any.required': 'Father Contact Number is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.base': 'Mother Name must be a string',
    'any.required': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'any.required': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.base': 'Mother Contact Number must be a string',
    'any.required': 'Mother Contact Number is required',
  }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'any.required': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.base': 'Local Guardian Occupation must be a string',
    'any.required': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': 'Local Guardian Contact Number must be a string',
    'any.required': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.base': 'Local Guardian Address must be a string',
    'any.required': 'Local Guardian Address is required',
  }),
});

// Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'Student ID must be a string',
    'any.required': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'any.only': '{#value} is not a supported gender',
    'any.required': 'Gender is required',
  }),
  datOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact Number must be a string',
    'any.required': 'Contact Number is required',
  }),
  emergencyContactNumber: Joi.string().required().messages({
    'string.base': 'Emergency Contact Number must be a string',
    'any.required': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present Address must be a string',
    'any.required': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent Address must be a string',
    'any.required': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGurdian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian information is required',
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not a valid status',
  }),
});

export default studentValidationSchema;
