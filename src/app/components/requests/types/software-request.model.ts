import { RequestMessage } from "./requestMessage.model";

export class SoftwareRequest {
	id: string;
	receiverName: string;
	receiverEmail: string;
	producerName: string;
	producerEmail: string;
	details: string;
	dateTime: Date;
	type: string;
	location: string;
	computerName: string;
	messages: RequestMessage[];

	constructor(id: string, receiverName: string, receiverEmail: string, producerName: string, producerEmail: string,  details: string, dateTime: Date, type: string, 
		location: string, computerName: string, messages: RequestMessage[]){
		this.id = id;
		this.receiverName = receiverName;
		this.receiverEmail = receiverEmail;
		this.producerName = producerName;
		this.producerEmail = producerEmail;
		this.details = details;
		this.dateTime = dateTime;
		this.type = type;
		this.location = location;
		this.computerName = computerName;
		this.messages = messages;
	}
}