import Homework from "../modules/homework.module.js";
import Staff from "../modules/staff.module.js";
import { decode } from "../utils/bcrypt.js";
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { refTokenWriteCookie } from "../utils/wtite-cookie.js";
import { homeworkValidation } from "../validation/homework.valid.js";

export class Homework_Controller {
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const homework = await Staff.findOne({ phone });

      if (!homework) {
        return catchError(res, 404, 'homework not found');
      }

      const isMatchPassword = decode(password, homework.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }
      const payload = { id: homework._id, role: homework.role };
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
      const { error, value } = homeworkValidation(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const newhomework = await Homework.create(value);

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newhomework,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getAll(_, res) {
    try {
      const homework = await Homework.find().populate('student_id').populate('lesson_of_courses_id');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: homework,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const homework = await Homework_Controller.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: homework,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await Homework_Controller.getId(res, id);
      const uptade = await Homework.findByIdAndUpdate(id, req.body, {
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
      await Homework_Controller.getId(res, id);
      await Homework.findByIdAndDelete(id);
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
      const course = await Homework.findById(id);
      if (!course) {
        return catchError(res, 404, 'Homework not found by id');
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
