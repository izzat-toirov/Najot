import Lessons from "../modules/lessons_of_courses.module.js";
import Staff from "../modules/staff.module.js";
import { decode } from "../utils/bcrypt.js";
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { refTokenWriteCookie } from "../utils/wtite-cookie.js";
import { lessonsValidation } from "../validation/lessons_of_courses.valid.js";


export class LessonsController {
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const lessons = await Staff.findOne({ phone });

      if (!lessons) {
        return catchError(res, 404, 'lessons not found');
      }

      const isMatchPassword = decode(password, lessons.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }
      const payload = { id: lessons._id, role: lessons.role };
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
      const { error, value } = lessonsValidation(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const newlessons = await Lessons.create(value);

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newlessons,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getAll(_, res) {
    try {
      const lessons = await Lessons.find().populate('course_id');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: lessons,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const lessons = await LessonsController.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: lessons,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await LessonsController.getId(res, id);
      const uptade = await Lessons.findByIdAndUpdate(id, req.body, {
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
      await LessonsController.getId(res, id);
      await Lessons.findByIdAndDelete(id);
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
      const course = await Lessons.findById(id).populate('course_id');
      if (!course) {
        return catchError(res, 404, 'Doctor not found by id');
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
