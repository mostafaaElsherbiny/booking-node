import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import hashPassword from '../helpers/hashPassword';
import Token from './Token';
import { BaseModel } from '@modules/core/Model/BaseModel';
import Ticket from '../../event/entities/Ticket';

@Entity()
export default class User extends BaseModel {
	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column('simple-array', { default: ['user'] })
	roles: string[];

	@OneToMany(() => Token, (token) => token.user)
	tokens: Token[];

	@OneToMany(() => Ticket, (ticket) => ticket.user)
	tickets: Ticket[];

	toJSON(): User {
		delete this.password;

		this.roles = JSON.parse(this.roles as any) || [];

		return this;
	}

	@BeforeInsert()
	@BeforeUpdate()
	async hashPasswordBeforeSave(): Promise<void> {
		if (this.password) {
			this.password = await hashPassword(this.password);
		}
	}
}
