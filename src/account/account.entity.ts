import { Entity, Column, ObjectIdColumn, CreateDateColumn, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsEmail } from 'class-validator';

@Entity()
@Unique(['username', 'email'])
export class AuthAccount {
  @ObjectIdColumn()
  // tslint:disable-next-line:variable-name
  _id: string;

  @Column({ length: 500 })
  username: string;

  @Exclude()
  @Column({ length: 500 })
  password: string;

  @Column('text')
  @IsEmail()
  email: string;

  @Optional()
  @Column('text')
  accessToken: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;

  @CreateDateColumn()
  createdDate: string;
}