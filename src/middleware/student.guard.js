import { catchError } from "../utils/error.response.js";

export const StudentGuard = (req, res, next) => {
  try {
    const user = req?.user;
    if (!user) {
      return catchError(res, 401, 'Foydalanuvchi autentifikatsiya qilinmagan');
    }
    if (user.role === 'student' || user.id == req.params.id) {
      return next();
    } else {
      return catchError(res, 403, 'Ruxsat berilmagan foydalanuvchi');
    }
  } catch (error) {
    return catchError(res, 500, error.message);
  }
};
