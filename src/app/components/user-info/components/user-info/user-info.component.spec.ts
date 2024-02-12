import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NavbarComponent } from "../../../shared/modules/navbar/components/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserInfoComponent } from "./user-info.component";

describe("UserInfoComponent", () => {
	let component: UserInfoComponent;
	let fixture: ComponentFixture<UserInfoComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [UserInfoComponent, NavbarComponent],
			imports: [HttpClientTestingModule, RouterTestingModule,FormsModule,
				ReactiveFormsModule]
		});
		fixture = TestBed.createComponent(UserInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
