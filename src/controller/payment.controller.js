import Payment from "../modules/payment.module.js";
import Staff from "../modules/staff.module.js";
import { decode } from "../utils/bcrypt.js";
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { refTokenWriteCookie } from "../utils/wtite-cookie.js";
import { paymentValidation } from "../validation/payment.valid.js";

export class Payment_Controller {
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const payment = await Staff.findOne({ phone });

      if (!payment) {
        return catchError(res, 404, 'payment not found');
      }

      const isMatchPassword = decode(password, payment.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }
      const payload = { id: payment._id, role: payment.role };
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
      const { error, value } = paymentValidation(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const newpayment = await Payment.create(value);

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newpayment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getAll(_, res) {
    try {
      const payment = await Payment.find().populate('enrollment_id');
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: payment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment_Controller.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: payment,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await Payment_Controller.getId(res, id);
      const uptade = await Payment.findByIdAndUpdate(id, req.body, {
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
      await Payment_Controller.getId(res, id);
      await Payment.findByIdAndDelete(id);
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
      const course = await Payment.findById(id).populate('enrollment_id');
      if (!course) {
        return catchError(res, 404, 'payment not found by id');
      }
      return course;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
