export class ChangePositionModel {
	userId: string;
	adminId: string;
	positionId: string;

	constructor(userId: string, adminId: string, positionId: string) {
		this.userId = userId;
		this.adminId = adminId;
		this.positionId = positionId;
	}
}