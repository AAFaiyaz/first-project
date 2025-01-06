import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const student = new Student(studentData);
  // if (await student.isUSerExist(studentData.id)) {
  //   throw new Error('USer already exist');
  // }
  // const result = await student.save(); // built in instance method

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('USer already exist');
  }

  const result = await Student.create(studentData); //built in static method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
