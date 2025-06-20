import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CreatorSocial } from '../../creator-social/model/creator-social.model';

@Table({ tableName: 'social' })
export class Social extends Model<
  Social,
  { title: string; description: string;}
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => CreatorSocial)
  creatorSocial: CreatorSocial
}
