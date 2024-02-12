import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarComponent } from "../../../shared/modules/navbar/components/navbar.component";
import { UserDocumentComponent } from "./user-document.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("UserDocumentComponent", () => {
	let component: UserDocumentComponent;
	let fixture: ComponentFixture<UserDocumentComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [UserDocumentComponent, NavbarComponent],
			imports: [HttpClientTestingModule, FormsModule,
				ReactiveFormsModule]
		});
		fixture = TestBed.createComponent(UserDocumentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
