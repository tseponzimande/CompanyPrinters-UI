import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { userModel } from 'src/app/Model/userModel';

import { AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { printerModel } from 'src/app/Model/printerModel';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PrinterAddEditComponent } from '../printer-add-edit/printer-add-edit.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { DashboardAddEditComponent } from 'src/app/components/dashboard-add-edit/dashboard-add-edit.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users:any = [];
  public role!:string;
  public fullName : string = "";
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService, private _dialog: MatDialog) { }

  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'password', 'role', 'email', 'address', 'action'];
  dataSource : any;

 /*designationOtpions = [ 
  {value: '1', viewValue: 'employee'},
  {value: '2', viewValue: 'manager'},
  {value: '3', viewValue: 'administrator'}
];*/

 /*designation = [
    {DesignationID : 1, label :'Manager'},
    {DesignationID : 2, label :'System Administrator'},
    {DesignationID : 3, label :'Level 1 Employee'}
  ];

  getPrinterMakeName( printerMakeID: number): string {

    const printermake = this.printermakeOptions.find((p) => p.printerMakeID ===  printerMakeID);
  
    return printermake ? printermake.label : '';
  
  }*/
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
  }
  
  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        const fullNameFromToken = this.auth.getfullNameFromToken();
        this.fullName = val || fullNameFromToken
      });

    this.userStore.getRoleFromStore()
      .subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
  }

  logout() {
    this.auth.signOut();
  }

  getUsers() {
    this.api.getUsers().subscribe(result => {
      this.users = result;

      
      this.users = new MatTableDataSource<userModel>(this.users)
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    });
  }

  filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.users.filter = filvalue;

    /*if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }
  
  getrow(row: any) {
    //console.log(row);
  }

  FunctionEdit(row: any) {
    console.log(row);
  }
 
  DelUser(id: number) {
    this.api.DeleteUser(id).subscribe({
      next: (res) => {
        alert('User Deleted Successfuly');
        this.getUsers();
      },
      error: console.log,
    });

    //this.printers = this.printerServ.showdata();
  }


  openAddEditUserForm(){
    const dialogRef = this._dialog.open(DashboardAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getUsers();
        }
      },
    });
    /*this._dialog.open(PrinterAddEditComponent)*/
  }
  
  openEditForm(data : any) {
   const dialogRef = this._dialog.open(DashboardAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getUsers();
        }
      },
    });
  }

  applyFilter(column: string, event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
  
    this.users.filterPredicate = (data: any, filter: string) => {
  
      const value = data[column].toLowerCase();
  
      return value.includes(filter);
  
    };
  
    this.users.filter = filterValue.trim().toLowerCase();
  
  }
    
  
}
