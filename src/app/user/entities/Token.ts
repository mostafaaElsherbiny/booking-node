import { Entity, Column, ManyToOne } from 'typeorm';
import User from './User';
import { BaseModel } from '@modules/core/Model/BaseModel';

@Entity()
export default class Token extends BaseModel {
	@Column()
	token: string;

	@ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
	user: User;
}
