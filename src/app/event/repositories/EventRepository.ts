import { Between, LessThan, Like, MoreThanOrEqual, getManager } from 'typeorm';
import Event from '../entities/Event';
import Ticket from '../entities/Ticket';

export type ICreateEvent = {
	name: string;
	date: Date;
	availableAttendeesCount: number;
	description: string;
	category: string;
};

class EventRepository {
	all = async (filters: { name?: string; startDate?: string; endDate?: string; category?: string }) => {
		let where = {}; // This is a placeholder for the where clause
		if (filters.name) {
			where = {
				...where,
				name: Like(filters.name),
			};
		}
		if (filters.startDate && filters.endDate) {
			where = {
				...where,
				date: Between(filters.startDate, filters.endDate),
			};
		}
		if (filters.category) {
			where = {
				...where,
				category: filters.category,
			};
		}

		if (filters.startDate && !filters.endDate) {
			where = {
				...where,
				date: MoreThanOrEqual(filters.startDate),
			};
		}

		if (!filters.startDate && filters.endDate) {
			where = {
				...where,
				date: LessThan(filters.endDate),
			};
		}

		return await Event.find({ where });
	};
	create = async (data: ICreateEvent) => {
		return await Event.create(data).save();
	};

	bookTicket = async (data: { id: number; attendeesCount: number; userId: number }) => {
		return getManager().transaction(async (transactionalEntityManager) => {
			let event: Event;
			let ticket: Ticket;

			event = await transactionalEntityManager.findOne(Event, data.id);

			if (!event) {
				throw new Error('Event not found');
			}
			if (event.availableAttendeesCount < data.attendeesCount) {
				throw new Error('Not enough tickets available');
			}
			event.availableAttendeesCount -= data.attendeesCount;

			await transactionalEntityManager.save(event);

			ticket = transactionalEntityManager.create(Ticket, {
				user: { id: data.userId },
				event: { id: data.id },
				attendeesCount: data.attendeesCount,
			});
			await transactionalEntityManager.save(ticket);


			return ticket.id;
		});
	};
}

export default new EventRepository();
