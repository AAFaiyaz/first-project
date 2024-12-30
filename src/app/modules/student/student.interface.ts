import { Schema, model, connect } from 'mongoose';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  datOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Gurdian;
  localGurdian: LocalGurdian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
