import { Entity, Column, ObjectIdColumn, CreateDateColumn, Unique, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsEmail, MinLength } from 'class-validator';
import { createHmac } from 'crypto';

@Entity()
@Unique(['username', 'email'])
export class AuthAccount {
  @ObjectIdColumn()
  // tslint:disable-next-line:variable-name
  _id: string;

  @Column({ length: 500 })
  username: string;

  @Exclude()
  @MinLength(4)
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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = createHmac('sha256', this.password).digest('hex');
    }
  }
}