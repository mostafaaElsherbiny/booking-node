import _ from 'lodash';

export default (Schema: (arg0: any) => any, data: any) => {
	const schema = typeof Schema === 'function' ? Schema(data) : Schema;
	const validationResult = schema.unknown(true).validate(data, { abortEarly: false });
	if (!validationResult.error) return _.pick(validationResult.value, ['params', 'query', 'body']);

	const errors = validationResult.error.details.flatMap((val: any) => {
		if (val.type === 'alternatives.match') return val.context.details.map((val: any) => val.message.split('"').join(''));
		return { message: val.message.split('"').join(''), path: val.context.label };
	});
	return { errors };
};
