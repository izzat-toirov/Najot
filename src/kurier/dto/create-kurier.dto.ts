import { Kurier } from '../model/kurier.model';

export class CreateKurierDto implements Partial<Kurier> {
  full_name: string;
  phone: string;
  email: string;
  status: string;
}
