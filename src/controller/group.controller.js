import Group from '../modules/group.module.js';
import Staff from '../modules/staff.module.js';
import { decode } from '../utils/bcrypt.js';
import { catchError } from '../utils/error.response.js';
import {
  generatorAccessToken,
  generatorRefreshToken,
} from '../utils/generator.token.js';
import { refTokenWriteCookie } from '../utils/wtite-cookie.js';
import { groupValid } from '../validation/group.valid.js';

export class GroupController {
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
      const { error, value } = groupValid(req.body);
      if (error) {
        return catchError(res, 400, error);
      }
      const newGroup = await Group.create(value);
      return res.status(201).json({
        statusCode: 201,
        message: 'success',
        data: newGroup,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getAll(_, res) {
    try {
      const group = await Group.find();
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: group,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const group = await GroupController.getId(res, id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: group,
      });
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
  async uptade(req, res) {
    try {
      const { id } = req.params;
      await GroupController.getId(res, id);
      const uptade = await Group.findByIdAndUpdate(id, req.body, { new: true });
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
      await GroupController.getId(res, id);
      await Group.findByIdAndDelete(id);
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
      const group = await Group.findById(id);
      if (!group) {
        return catchError(res, 404, 'Doctor not found by id');
      }
      return group;
    } catch (error) {
      return catchError(res, 500, error.message);
    }
  }
}
