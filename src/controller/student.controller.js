import { decode, encode } from '../utils/bcrypt.js';
import Student from '../modules/student.module.js';
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { studentValid } from '../validation/student.valid.js';
import Staff from '../modules/staff.module.js';

export class StudentController {
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const staff = await Staff.findOne({ phone });

      if (!staff) {
        return catchError(res, 404, 'Staff not found');
      }

      const isMatchPassword = decode(password, staff.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }
      const payload = { id: staff._id, role: staff.role };
      const accessToken = generatorAccessToken(payload);
      const refreshToken = generatorRefreshToken(payload);
      return res.status(200).json({
        statusCode: 200,
        message: 'Login successful',
        data: accessToken,
        refreshToken,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async create(req, res) {
    try {
      const { error, value } = studentValid(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const { password, ...data } = value;
      const hash = await encode(password, 10);

      const newStudent = await Student.create({ password: hash, ...data });

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newStudent,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getAll(_, res) {
    try {
      const student = await Student.find().populate('group_id');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: student,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const student = await StudentController.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: student,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await StudentController.getId(res, id);
      const uptade = await Student.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: uptade,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      await StudentController.getId(res, id);
      await Student.findByIdAndDelete(id);
      return res.status(200).json({
        sratusCode: 200,
        message: 'success',
        data: {},
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  static async getId(res, id) {
    try {
      const student = await Student.findById(id);
      if (!student) {
        return catchError(res, 404, 'Doctor not found by id');
      }
      return student;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
