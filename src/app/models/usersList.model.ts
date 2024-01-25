import { Employee } from "./employee.model";

export interface UsersList {
    users: Employee[];
    usersCount: number;
}