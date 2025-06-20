import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CreatorSocial } from '../../creator-social/model/creator-social.model';
import { Donation } from '../../donations/model/donation.model';
import { Notification } from '../../notifications/model/notification.model';

@Table({ tableName: 'admins' })
export class Admin extends Model<
  Admin,
  { username: string; email: string; password: string; role: string }
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

    @HasMany(() =>CreatorSocial)
    creatorSocial: CreatorSocial
    
    @HasMany(() =>Donation)
    donation: Donation
    
    @HasMany(() => Notification)
    notification: Notification
  }
