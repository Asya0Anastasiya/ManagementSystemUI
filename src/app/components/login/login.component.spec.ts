import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LoginComponent],
			imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
		});
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should toggle password visibility", () => {
		// Initial state
		expect(component.type).toEqual("password");
		expect(component.isText).toBeFalse();
		expect(component.eyeIcon).toEqual("fa-eye-slash");
    
		// Call the hideShowPass function
		component.hideShowPass();
		fixture.detectChanges();
    
		// Check the updated state
		expect(component.type).toEqual("text");
		expect(component.isText).toBeTrue();
		expect(component.eyeIcon).toEqual("fa-eye");
    
		// Call the hideShowPass function again
		component.hideShowPass();
		fixture.detectChanges();
    
		// Check the reverted state
		expect(component.type).toEqual("password");
		expect(component.isText).toBeFalse();
		expect(component.eyeIcon).toEqual("fa-eye-slash");
	});
});
