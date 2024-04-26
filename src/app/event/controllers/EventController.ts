import { Request, Response } from 'express';
import ApiResponse from '@modules/core/helpers/ApiResponse';
import EventRepository from '../repositories/EventRepository';

class EventController {
	index = async (req: Request, res: Response) => {
		let data = await EventRepository.all({
			name: req.query.name as string,
			startDate: req.query.startDate as string,
			endDate: req.query.endDate as string,
			category: req.query.category as string,
		});

		ApiResponse.success(res, data);
	};
	store = async (req: Request, res: Response) => {
		let preparedData = {
			name: req.body.name,
			date: req.body.date,
			availableAttendeesCount: req.body.availableAttendeesCount,
			description: req.body.description,
			category: req.body.category,
		};

		let data = await EventRepository.create(preparedData);

		ApiResponse.success(res, data);
	};

	bookTicket = async (req: Request, res: Response) => {
		let data = await EventRepository.bookTicket({ id: parseInt(req.params.id), attendeesCount: req.body.attendeesCount, userId: req.body.userId });

		ApiResponse.success(res, data);
	};
}

export default new EventController();
