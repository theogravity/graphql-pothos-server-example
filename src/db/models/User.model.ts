import { Table, Column, Model } from 'sequelize-typescript';

@Table({ timestamps: true })
export default class User extends Model {
  @Column
  name!: string;
}
