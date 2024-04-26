
import supertest from 'supertest';

const app = import('@root/src/app');
describe('EventController', () => {

	it('should create an event successfully', async () => {
		const mockEvent = {
			name: 'Test Event',
			date: new Date(),
			availableAttendeesCount: 100,
			description: 'This is a test event',
			category: 'Test',
		};


		const request = supertest(app).get('/api/events');

	});

});
