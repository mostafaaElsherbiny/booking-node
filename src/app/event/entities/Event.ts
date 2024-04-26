import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from '@modules/core/Model/BaseModel';
import Category from '../enums/UserRoleEnum';
import Ticket from './Ticket';

@Entity()
export default class Event extends BaseModel {
	@Column()
	name: string;

	@Column()
	date: Date;

	@Column()
	availableAttendeesCount: number;

	@Column()
	description: string;

	@Column({
		type: 'enum',
		enum: Category,
	})
	category: string;

	@OneToMany(() => Ticket, (ticket) => ticket.event)
	tickets: Ticket[];
}
