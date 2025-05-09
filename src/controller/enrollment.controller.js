import Enrollment from "../modules/enrollment.module.js";
import Staff from "../modules/staff.module.js";
import { decode } from "../utils/bcrypt.js";
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { refTokenWriteCookie } from "../utils/wtite-cookie.js";
import { enrollmentValidation } from "../validation/enrollment.valid.js";

export class Enrollment_Controller {
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const enrollment = await Staff.findOne({ phone });

      if (!enrollment) {
        return catchError(res, 404, 'enrollment not found');
      }

      const isMatchPassword = decode(password, enrollment.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }
      const payload = { id: enrollment._id, role: enrollment.role };
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
      const { error, value } = enrollmentValidation(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const newenrollment = await Enrollment.create(value);

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newenrollment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getAll(_, res) {
    try {
      const enrollment = await Enrollment.find().populate('student_id').populate('course_id');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: enrollment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const enrollment = await Enrollment_Controller.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: enrollment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await Enrollment_Controller.getId(res, id);
      const uptade = await Enrollment.findByIdAndUpdate(id, req.body, {
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
      await Enrollment_Controller.getId(res, id);
      await Enrollment.findByIdAndDelete(id);
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
      const course = await Enrollment.findById(id).populate('student_id').populate('course_id');
      if (!course) {
        return catchError(res, 404, 'enrollment not found by id');
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
