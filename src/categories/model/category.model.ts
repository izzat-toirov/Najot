import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Social } from '../../social/model/social.model';

@Table({ tableName: 'Category' })
export class Category extends Model<
  Category,
  { name: string; description: string }
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  description: string;

  
}
