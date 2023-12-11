import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { SignupComponent } from "./signup.component";

describe("SignupComponent", () => {
	let component: SignupComponent;
	let fixture: ComponentFixture<SignupComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SignupComponent, NavbarComponent],
			imports: [HttpClientTestingModule, FormsModule,
				ReactiveFormsModule]
		});
		fixture = TestBed.createComponent(SignupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
