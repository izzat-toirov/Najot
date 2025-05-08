import Course from "../modules/course.module.js";
import Staff from "../modules/staff.module.js";
import { decode } from "../utils/bcrypt.js";
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { courseValid } from "../validation/couse.valid.js";

export class CourseController {
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const course = await Staff.findOne({ phone });

      if (!course) {
        return catchError(res, 404, 'course not found');
      }

      const isMatchPassword = decode(password, course.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }
      const payload = { id: course._id, role: course.role };
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
      const { error, value } = courseValid(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const newcourse = await Course.create(value);

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newcourse,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getAll(_, res) {
    try {
      const course = await Course.find();
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const course = await CourseController.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await CourseController.getId(res, id);
      const uptade = await Course.findByIdAndUpdate(id, req.body, {
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
      await CourseController.getId(res, id);
      await Course.findByIdAndDelete(id);
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
      const course = await Course.findById(id);
      if (!course) {
        return catchError(res, 404, 'Doctor not found by id');
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
