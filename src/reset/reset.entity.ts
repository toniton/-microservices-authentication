import { Entity, ObjectIdColumn, Column, ObjectID, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { AuthAccount } from 'account/account.entity';
import { Hash } from 'crypto';

@Entity()
export class ResetEntity {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    _id: ObjectID;

    @OneToOne(type => AuthAccount)
    account: AuthAccount;

    @Column('text')
    resetToken: string;

    @UpdateDateColumn()
    expiryDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @CreateDateColumn()
    createdDate: Date;

    @BeforeInsert()
    @BeforeUpdate()
    setExpiryDate() {
      if (this.expiryDate) {
        this.expiryDate = new Date(new Date(Date.now()).getTime() + 3 * 86400000);
      }
    }
}
