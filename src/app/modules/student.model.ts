import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import {
  TLocalGurdian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
  TGurdian,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20'],
    // validate: {
    //   validator: function (value) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     // if (value !== firstNameStr) {
    //     //   return false;
    //     // }
    //     // return true;
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in captalize format',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => {
        return validator.isAlpha(value);
      },
      message: '{VALUE} is not valid',
    },
  },
});

const gurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother Contact Number is required'],
  },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
});

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password cant be more than 20 characters'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: `{VALUE} is not a supported gender`,
      },
      required: [true, 'Gender is required'],
    },
    datOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact Number is required'],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: gurdianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGurdian: {
      type: localGurdianSchema,
      required: [true, 'Local Guardian information is required'],
    },
    profileImage: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
studentSchema.virtual('fullname').get(function () {
  return (
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  );
});

/* pre save middleware/ hook  will work on create() save () */
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');
  //hashing password
  const user = this; // doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
/* post save middleware/ hook */
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  // console.log(this, 'post hook: we save our data');
  next();
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// [{ $match: { isDeleted: {$ne: true}}}, { $match: { id: '123458' } }];
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom instance method
// studentSchema.methods.isUSerExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
