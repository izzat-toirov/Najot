import { Admin } from '../model/admin.model';

export class CreateAdminDto implements Partial<Admin> {
  username: string;
  email: string;
  password: string;
  role: string;
}
