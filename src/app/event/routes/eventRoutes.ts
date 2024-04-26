import express from 'express';
import EventController from '../controllers/EventController';
import validation from '../validations/event';

const router = express.Router();

router.post('/', validation.create, EventController.store);

router.get('/', validation.index, EventController.index);

router.post('/:id/tickets', EventController.bookTicket);
export { router as eventRoutes };
