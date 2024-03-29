import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class UserStoreService {

	private email$ = new BehaviorSubject<string>("");
	private role$ = new BehaviorSubject<string>("");
	private nameid$ = new BehaviorSubject<string>("");
	private department$ = new BehaviorSubject<string>("");

	constructor() { }

	public getRoleFromStore(){
		return this.role$.asObservable();
	}

	public setRoleForStore(role: string){
		this.role$.next(role);
	}

	public getEmailFromStore(){
		return this.email$.asObservable();
	}

	public setEmailForStore(email: string){
		this.email$.next(email);
	}

	public setNameidForStore(nameid: string){
		this.nameid$.next(nameid);
	}

	public getIdFromStore(){
		return this.nameid$.asObservable();
	}

	public setDepartmentForStore(department: string){
		this.department$.next(department);
	}

	public getDepartmentFromStore(){
		return this.department$.asObservable();
	}
}
