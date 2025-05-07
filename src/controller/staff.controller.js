import { decode, encode } from '../utils/bcrypt.js';
import Staff from '../modules/staff.module.js';
import { catchError } from '../utils/error.response.js';
import { staffValid } from '../validation/staff.valid.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { otpGenerator } from '../utils/otp-generator.js';
import { transporter } from '../utils/mailer.js';
import { getCache, setCache } from '../utils/cache.js';
import { refTokenWriteCookie } from '../utils/wtite-cookie.js';

export class StaffController {
  async create(req, res) {
    try {
      const { error, value } = staffValid(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const { password, ...data } = value;
      const hash = await encode(password, 10);

      const newStaff = await Staff.create({ password: hash, ...data });

      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newStaff,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async signIn(req, res) {
    try {
      const { phone, password } = req.body;
      const staff = await Staff.findOne({ phone });
      if (!staff) {
        return catchError(res, 404, 'staff not found');
      }

      const isMatchPassword = decode(password, staff.password);

      if (!isMatchPassword) {
        return catchError(res, 400, 'Invalid password');
      }

      const otp = otpGenerator();
      const mailMessage = {
        from: process.env.SMTP_USER,
        to: 'izzatgamer49@gmail.com',
        subject: 'Najot',
        text: otp,
      };

      transporter.sendMail(mailMessage, function (err, info) {
        if (err) {
          console.log(`Error on sending to mail: ${err}`);
          return catchError(res, 400, err);
        } else {
          console.log(info);
          setCache(staff.phone, otp);
          return res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: {},
          });
        }
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async accessToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return catchError(res, 401, 'Refresh token not found');
      }
      const decodedToken = jwt.verify(refreshToken, process.env.JWT_KEY);
      if (!decodedToken) {
        return catchError(res, 401, 'Refresh token expired');
      }
      const payload = { id: decodedToken.id, role: decodedToken.role };
      const accessToken = generatorAccessToken(payload);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: accessToken,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async confirmSigIn(req, res) {
    try {
      const { phone, otp } = req.body;
      const staff = await Staff.findOne({ phone });
      if (!staff) {
        return catchError(res, 400, 'Wrong phone number');
      }

      const otpCache = getCache(phone);

      if (!otpCache || otp.toString() !== otpCache.toString()) {
        return catchError(res, 400, 'OTP expired');
      }
      const payload = { id: staff._id, role: staff.role };
      const accessToken = generatorAccessToken(payload);
      const refreshToken = generatorRefreshToken(payload);
      refTokenWriteCookie(res, 'refreshToken', refreshToken);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: accessToken,
      });
    } catch (error) {
      return;
    }
  }
  async getAll(_, res) {
    try {
      const staff = await Staff.find();
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: staff,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const staff = await StaffController.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: staff,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await StaffController.getId(res, id);
      const uptade = await Staff.findByIdAndUpdate(id, req.body, { new: true });
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
      await StaffController.getId(res, id);
      await Staff.findByIdAndDelete(id);
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
      const staff = await Staff.findById(id);
      if (!staff) {
        return catchError(res, 404, 'Doctor not found by id');
      }
      return staff;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
