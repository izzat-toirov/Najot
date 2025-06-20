import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Admin } from '../../admin/model/admin.model';

@Table({ tableName: 'Donations' })
export class Donation extends Model<
  Donation,
  {
    supporter_id: number;
    creator_id: number;
    amount: string;
    message: string;
    payment_method: string;
  }
> {
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    unique: true,
  })
  supporter_id: number;
  @BelongsTo(() => Admin, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  admin: Admin;
  
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
  admin2: Admin;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    // unique: true,
  })
  amount: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payment_method: string;
}
