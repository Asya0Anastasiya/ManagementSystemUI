import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavbarComponent } from "../navbar/navbar.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatTooltip } from "@angular/material/tooltip";
import { EmployeesComponent } from "./employees.component";
import { MatExpansionPanel } from "@angular/material/expansion";
import { MatExpansionPanelHeader } from "@angular/material/expansion";
import { MatExpansionPanelTitle } from "@angular/material/expansion";

describe("EmployeesComponent", () => {
	let component: EmployeesComponent;
	let fixture: ComponentFixture<EmployeesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EmployeesComponent, NavbarComponent, MatPaginator, MatTooltip, MatExpansionPanel, 
				MatExpansionPanelHeader, MatExpansionPanelTitle],
			imports: [HttpClientTestingModule]
		});
		fixture = TestBed.createComponent(EmployeesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
