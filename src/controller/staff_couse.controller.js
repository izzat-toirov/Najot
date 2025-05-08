import Staff_Course from "../modules/staff_course.module.js";
import Staff from "../modules/staff.module.js";
import { decode } from "../utils/bcrypt.js";
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { staffCourseValid } from "../validation/staff_course.valid.js";
import { StaffController } from "./staff.controller.js";

export class staff_CourseController {
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const staff_Course = await Staff.findOne({ phone });

      if (!staff_Course) {
        return catchError(res, 404, 'staff_Course not found');
      }

      const isMatchPassword = decode(password, staff_Course.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }
      const payload = { id: staff_Course._id, role: staff_Course.role };
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
      const { error, value } = staffCourseValid(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const newstaff_Course = await Staff_Course.create(value);

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newstaff_Course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getAll(_, res) {
    try {
      const staff_Course = await Staff_Course.find();
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: staff_Course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const staff_Course = await staff_CourseController.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: staff_Course,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await staff_CourseController.getId(res, id);
      const uptade = await Staff_Course.findByIdAndUpdate(id, req.body, {
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
      await staff_CourseController.getId(res, id);
      await Staff_Course.findByIdAndDelete(id);
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
      const course = await Staff_Course.findById(id);
      if (!course) {
        return catchError(res, 404, 'Doctor not found by id');
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
