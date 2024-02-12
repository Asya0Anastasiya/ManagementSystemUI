import { Injectable } from "@angular/core";
import { Employee } from "../types/employee.model";
import { ApiService } from "../../services/api.service";

@Injectable({
	providedIn: "root"
})

export class ImageService {
	initiateUsersImages(users: Employee[], api: ApiService) {
		for (let i = 0; i < users.length; i++) {
			users[i].url = "assets/img/catNews.jpg";
			api.getUserImage(users[i].id).subscribe(response => {
				if (response.toString() != "Image not found") {
					const imageUrl = URL.createObjectURL(response);
					users[i].url = imageUrl;
				}
			}, error => {
				console.log(error);
			});
		}
	}

	initiateUserImage(id: string, api: ApiService) : string {
		let url = "assets/img/catNews.jpg";
		api.getUserImage(id).subscribe(response => {
			const imageUrl = URL.createObjectURL(response);
			url = imageUrl;
		}, error => {
			console.log(error);
		});
		return url;
	}
}