import Student from "../modules/student.module.js";
import Staff from "../modules/staff.module.js";
import { decode, encode } from "../utils/bcrypt.js";
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { studentValid } from "../validation/student.valid.js";
import { refTokenWriteCookie } from "../utils/wtite-cookie.js";



export class Student_Controller {
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const student_Course = await Staff.findOne({ phone });

      if (!student_Course) {
        return catchError(res, 404, 'student_Course not found');
      }

      const isMatchPassword = decode(password, student_Course.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }
      const payload = { id: student_Course._id, role: student_Course.role };
      const accessToken = generatorAccessToken(payload);
      const refreshToken = generatorRefreshToken(payload);
      refTokenWriteCookie(res, 'refreshToken', refreshToken);
      return res.status(200).json({
        statusCode: 200,
        message: 'Login successful',
        data: accessToken
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

      const newstudent = await Student.create({ password: hash, ...data });

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newstudent,
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
      const student = await Student_Controller.getId(res, id);
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
      await Student_Controller.getId(res, id);
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
      await Student_Controller.getId(res, id);
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
      const course = await Student.findById(id).populate('group_id');
      if (!course) {
        return catchError(res, 404, 'student not found by id');
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
