import { Table, Column, Model, Index } from 'sequelize-typescript';

@Table({ timestamps: true })
export default class Post extends Model {
  @Index
  @Column
  authorId!: number;

  @Column
  title!: string;

  @Column
  content!: string;
}
