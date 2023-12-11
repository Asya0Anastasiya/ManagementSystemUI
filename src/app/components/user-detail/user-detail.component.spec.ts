import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatPaginator } from "@angular/material/paginator";
import { UserDetailComponent } from "./user-detail.component";
import { MatTooltip } from "@angular/material/tooltip";

describe("UserDetailComponent", () => {
	let component: UserDetailComponent;
	let fixture: ComponentFixture<UserDetailComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [UserDetailComponent, NavbarComponent, MatPaginator, MatTooltip],
			imports: [RouterTestingModule, HttpClientTestingModule]
		});
		fixture = TestBed.createComponent(UserDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
