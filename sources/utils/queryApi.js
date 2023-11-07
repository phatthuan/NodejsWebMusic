class QueryApi {
	constructor(query, queryStringRequest) {
		this.query = query;
		this.queryStringRequest = queryStringRequest;
	}

	filter() {
		const queryObj = { ...this.queryStringRequest };
		// 1B) Advanced filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
		this.query.find(JSON.parse(queryStr));
		return this;
	}

	sort() {
		if (this.queryStringRequest.sort) {
			const sortStr = this.queryStringRequest.sort;
			const sortBy = sortStr.split(',').join(' ');
			this.query.sort(sortBy);
		} else {
			this.query.sort('-createdAt');
		}
		return this;
	}

	limitFields() {
		if (this.queryStringRequest.fields) {
			const fieldsStr = this.queryStringRequest.fields;
			const fields = fieldsStr.split(',').join(' ');
			this.query.select(fields);
		} else {
			// remove __v field
			this.query.select('-__v');
		}
		return this;
	}

	paginate() {
		const defaultLimit = this.queryStringRequest.limit || 10;
		const limit = Number(defaultLimit);
		const defaultPage = this.queryStringRequest.page || 1;
		const page = Number(defaultPage) - 1;
		const skip = page * limit;

		//Example skip 0 elements and limit 10 elements in page 1
		this.query.skip(skip).limit(limit);

		return this;
	}

	get queryResult() {
		return this.query;
	}
}

module.exports = QueryApi;
