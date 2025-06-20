import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'kuriers' })
export class Kurier extends Model<
  Kurier,
  { full_name: string; phone: string; email: string; status: string }
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

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
  status: string;

}
