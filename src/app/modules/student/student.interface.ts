import { Schema, model, connect, Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  datOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGurdian;
  localGurdian: TLocalGurdian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

// for creating instance
// export type StudentMethods = {
//   isUSerExist(id: string): Promise<TStudent | null>;
// };

// Create a new Model type that knows about IUserMethods...
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

// for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
