import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Admin } from '../../admin/model/admin.model';

@Table({ tableName: 'Notifications' })
export class Notification extends Model<
  Notification,
  { user_id: number; message: string }
> {
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    unique: true,
  })
  user_id: number;
  @BelongsTo(() => Admin, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    admin: Admin;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  message: string;
}
