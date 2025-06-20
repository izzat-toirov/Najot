import { CreatorSocial } from '../model/creator-social.model';

export class CreateCreatorSocialDto implements Partial<CreatorSocial> {
  creator_id: number;
  social_id: number;
  url: string;
}
