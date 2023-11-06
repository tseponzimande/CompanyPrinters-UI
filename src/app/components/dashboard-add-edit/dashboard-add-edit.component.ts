import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrinterService } from 'src/app/services/printer.service';
import { ApiService } from 'src/app/services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { userModel } from 'src/app/Model/userModel';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard-add-edit',
  templateUrl: './dashboard-add-edit.component.html',
  styleUrls: ['./dashboard-add-edit.component.scss']
})
export class DashboardAddEditComponent implements OnInit {

  userForm!: FormGroup;

  selectedOption: string;
  
  ngOnInit(): void {
    
    if(this.data){

      this.userForm.controls['firstName'].setValue(this.data.firstName);
  
      this.userForm.controls['lastName'].setValue(this.data.lastName);
  
      this.userForm.controls['username'].setValue(this.data.username);
  
      this.userForm.controls['password'].setValue(this.data.password);
  
      //this.userForm.controls['role'].setValue(this.data.role);
  
      this.userForm.controls['email'].setValue(this.data.email);

      this.userForm.controls['address'].setValue(this.data.address);
  
      console.log('Form Values:', this.userForm.value);
  
     }
  
  }

  constructor(private _fb : FormBuilder,
    private _api : ApiService, 
    private _dialogRef: DialogRef<DashboardAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {                                                 
    this.userForm = this._fb.group ({

    firstName: ['',Validators.required],

    lastName: ['',Validators.required],

    username: ['',Validators.required],

    password: ['',Validators.required],

    email: ['',Validators.required],

    address: ['', Validators.required],

   // active: [false, Validators.required],false as a default

   // dateCreated: ['',Validators.required],
    });
  }

  onFormSubmit(event: Event) {

    event.preventDefault();
  
    console.log('Form Values:', this.userForm.value);
  
    if (this.userForm.valid) {
  
      const formData = this.userForm.value;  
  
      //const activeValue = formData.active === 'true' ? true : false;
  
      const updatedUser = {
  
        id: this.data ? this.data.id : 0,
  
        firstName: formData.firstName,
  
        lastName: formData.lastName,
  
        username: formData.username,
  
        password: formData.password,
  
        email: formData.email,
  
        address: formData.address,
  
        //dateCreated: formData.dateCreated.toISOString(),  
       //dateCreated: formData.dateCreated,
  
      };
  
      if (this.data) {

        this._api.updateUser(this.data.id, updatedUser).subscribe({
  
          next: (val: any) => {
  
            console.log('API call successful:', val);
  
            alert('User updated Successfully');

            window.location.reload();
  
            this._dialogRef.close();
  
          },
  
          error: (err: any) => {
  
            console.error('API call error:', err);
  
          },
  
        });
  
      } else {
  
        this._api.AddUser(updatedUser).subscribe({
  
          next: (val: any) => {
  
            console.log('API call successful:', val);
  
            alert('User Added Successfully');

            window.location.reload();
  
            this._dialogRef.close();
  
          },
  
          error: (err: any) => {
  
            console.error(err);
  
          },
  
        });
  
      }
  
    }
  
  }

  /*onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this._api.updateUser(this.data.id, this.userForm.value).subscribe({
          next: (val: any) => {
            alert('User updated successfully');
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
      else
      {
          if (this.userForm.valid) {
            console.log(this.userForm.value);
            let signUpObj = {
              ...this.userForm.value,
              role:'',
              token:''
            }
            this._api.AddUser(signUpObj)
            .subscribe({
              next:(res=>{
                console.log(res.message);
                this.userForm.reset();
                alert(res.message)
              }),
              error:(err=>{
                alert(err?.error.message)
              })
            })
          } 
      }
      

    }

  }*/

/*else {
        console.log(this.userForm.value);
        this._api.AddUser(this.userForm.value).subscribe({
          next: (val: any) => {
            alert('User added successfully');
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }*/
}
