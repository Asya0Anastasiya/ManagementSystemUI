export class ChangePermissionModel {
	userId: string;
	adminId: string;
	newRole: number;

	constructor(userId: string, adminId: string, newRole: number) {
		this.userId = userId;
		this.adminId = adminId;
		this.newRole = newRole;
	}
}