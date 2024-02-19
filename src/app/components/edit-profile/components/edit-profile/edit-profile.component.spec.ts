import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarComponent } from "../../../shared/modules/navbar/components/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { EditProfileComponent } from "./edit-profile.component";

describe("EditProfileComponent", () => {
	let component: EditProfileComponent;
	let fixture: ComponentFixture<EditProfileComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EditProfileComponent, NavbarComponent],
			imports: [HttpClientTestingModule, FormsModule,
				ReactiveFormsModule]
		});
		fixture = TestBed.createComponent(EditProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
