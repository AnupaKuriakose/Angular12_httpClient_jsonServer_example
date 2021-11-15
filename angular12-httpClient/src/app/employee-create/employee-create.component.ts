import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../shared/employee';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  totalEmployees!: any;

  empName!: string;
  empEmail!: string;
  empPhone!: number;

  constructor(
    public restApi: RestApiService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.totalEmployees = Number(params.count);
    });
  }

  addEmployee() {
    const employee = {
      id: this.totalEmployees + 1,
      name: this.empName,
      email: this.empEmail,
      phone: this.empPhone,
    };
    this.restApi.createEmployee(employee).subscribe((data) => {
      this.router.navigate(['/employees-list']);
    });
  }
}
