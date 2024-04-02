export class Request {
	id: string;
	receiver: string;
	details: string;
	dateTime: Date;
	type: string;

	constructor(id: string, receiver: string, details: string, dateTime: Date, type: string) {
		this.id = id;
		this.receiver = receiver;
		this.details = details;
		this.dateTime = dateTime;
		this.type = type;
	}
}