import { Entity, Column, ObjectIdColumn, CreateDateColumn, Unique, BeforeInsert, BeforeUpdate, ObjectID, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsEmail, MinLength } from 'class-validator';
import { hashPlainPassword } from 'util/util';

@Entity()
@Unique(['username', 'email'])
export class AuthAccount {
  @ObjectIdColumn()
  // tslint:disable-next-line:variable-name
  _id: ObjectID;

  @Column({ length: 500 })
  username: string;

  @Exclude()
  @MinLength(4)
  @Column({ length: 500, select: false })
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

  @UpdateDateColumn()
  updatedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = hashPlainPassword(this.password);
    }
  }
}