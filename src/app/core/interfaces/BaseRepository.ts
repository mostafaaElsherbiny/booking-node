import { createQueryBuilder } from 'typeorm';
import IBaseRepository from './IBaseRepository';

class BaseRepository implements IBaseRepository {
	constructor(private entity, private tableName: string) {}
	getAll = async () => await this.entity.find();

	find = async (id: Number) => await this.entity.findOne({ id });

	store = async (data: {}) => await this.entity.create(data).save();

	update = async (id: Number, data: {}) => await this.entity.update(id, data);

	delete = async (id: Number) => await this.entity.delete(id);

	isExists = async (id: Number) => {
		return await createQueryBuilder(this.entity, this.tableName)
			.where(`${this.tableName}.id = :id`, {
				id,
			})
			.getCount();
	};
}

export default BaseRepository;
