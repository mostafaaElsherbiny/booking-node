import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseModel } from '@modules/core/Model/BaseModel';
import User from '../../user/entities/User';
import Event from './Event';

@Entity()
export default class Ticket extends BaseModel {

	@ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
	user: User;

    @ManyToOne(() => Event, (event) => event.tickets, { onDelete: 'CASCADE' })
    event: Event;

	@Column()
	attendeesCount: number;
}
