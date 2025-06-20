import { Donation } from '../model/donation.model';

export class CreateDonationDto implements Partial<Donation> {
  supporter_id: number;
  creator_id: number;
  amount: string;
  message: string;
  payment_method: string;
}
