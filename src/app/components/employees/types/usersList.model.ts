import { Employee } from "../../shared/types/employee.model";

export interface UsersList {
    users: Employee[];
    usersCount: number;
}