import { catchError } from '../utils/error.response.js';

export const TeacherGuard = (req, res, next) => {
  try {
    const user = req?.user;
    if (user.role === 'superadmin' || user.role === 'admin' || user.role === 'teacher') {
      return next();
    } else {
      return catchError(res, 403, 'Forbiddden user');
    }
  } catch (error) {
    return catchError(res, 500, error.message);
  }
};
