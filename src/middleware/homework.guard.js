import { catchError } from '../utils/error.response.js';

export const HomeworkGuard = (req, res, next) => {
  try {
    const user = req?.user;
    
    if (user.role === 'teacher' || user.role === 'student') {
      return next();
    } else {
      return catchError(res, 403, 'Forbiddden user');
    }
  } catch (error) {
    return catchError(res, 500, error.message);
  }
};
