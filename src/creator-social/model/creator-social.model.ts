import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Admin } from '../../admin/model/admin.model';
import { Social } from '../../social/model/social.model';

@Table({ tableName: 'CreatorSocials' })
export class CreatorSocial extends Model<
  CreatorSocial,
  { creator_id: number; social_id: number; url: string }
> {

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    unique: true,
  })
  creator_id: number;
  @BelongsTo(() => Admin, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  admin: Admin;
  


  @ForeignKey(() => Social)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    unique: true,
  })
  social_id: number;
  @BelongsTo(() => Social, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  social: Social


  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  url: string;
}
