export class NewRequestMessage {
	sender: string;
	receiver: string;
	content: string;
	requestId: string;

	constructor(sender: string, receiver: string, content: string, requestId: string) {
		this.sender = sender;
		this.receiver = receiver;
		this.content = content;
		this.requestId = requestId;
	}
}