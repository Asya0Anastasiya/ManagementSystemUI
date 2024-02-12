import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import * as loginComponent from "./login.component";

describe("LoginComponent", () => {
	let component: loginComponent.LoginComponent;
	let fixture: ComponentFixture<loginComponent.LoginComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [loginComponent.LoginComponent],
			imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule]
		});
		fixture = TestBed.createComponent(loginComponent.LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(loginComponent.LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should toggle password visibility", () => {
		expect(component.loginService.type).toEqual("password");
		expect(component.loginService.isText).toBeFalse();
		expect(component.loginService.eyeIcon).toEqual("fa-eye-slash");
    
		component.loginService.hideShowPass();
		fixture.detectChanges();
    
		expect(component.loginService.type).toEqual("text");
		expect(component.loginService.isText).toBeTrue();
		expect(component.loginService.eyeIcon).toEqual("fa-eye");
    
		component.loginService.hideShowPass();
		fixture.detectChanges();
    
		expect(component.loginService.type).toEqual("password");
		expect(component.loginService.isText).toBeFalse();
		expect(component.loginService.eyeIcon).toEqual("fa-eye-slash");
	});
});
