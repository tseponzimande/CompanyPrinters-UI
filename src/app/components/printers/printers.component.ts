import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { PrinterService } from 'src/app/services/printer.service';
import { HttpClient } from '@angular/common/http';
import { OutputFileType, Printer } from 'typescript';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss'],
})
export class PrintersComponent implements OnInit {
  colorControl = new FormControl('primary' as ThemePalette);
  model: any = {};
  printers: any = [];
  displayedColumns: string[] = ['printerName', 'printerMake', 'folderToMonitor', 'outputType', 'fileOutput', 'active', 'createTimeStamp', 'action'];
  dataSource: any;
  fromDate: Date;
  toDate: Date;

  startdate : Date;
  enddate : Date;
  printerMake : string;
  //ids = [1, 2, 3];

  /*bulkdelete() {
    var selecteddata = this.printers.filter(source => source.action === false)
    this.printers = selecteddata;
  }*/

  emp : any[];

  printermakeOptions = [{ value: '1', label: 'Canon' },
                        { value: '2', label: 'Samsung' },
                        { value: '3', label: 'Epson' },
                       ];

  //assign filtered date to the mattab
  
  /*printermakeOptions = [
    {printerMakeID : 1, label :'Canon'},
    {printerMakeID : 2, label :'Samsung'},
    {printerMakeID : 3, label :'Epson'}
  ];

  getPrinterMakeName( printerMakeID: number): string {

    const printermake = this.printermakeOptions.find((p) => p.printerMakeID ===  printerMakeID);
  
    return printermake ? printermake.label : '';
  
  }*/

  //dataSource = new MatTableDataSource<any>(this.printers);

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api: ApiService,
    private auth: AuthService,
    private printerServ: PrinterService,
    private http: HttpClient,
    private fb: FormBuilder,
    private _dialog: MatDialog) { }


  ngOnInit(): void {
    /*this.api.getPrinters()
    .subscribe(res=>{
    this.printers = res;
    });*/
    this.printerServ.showdata()
      .subscribe(res => {
        this.printers = res;
      });
  }

  showdata() {
    this.printerServ.showdata().subscribe(res => {
      this.printers = res;

      this.printers = new MatTableDataSource<printerModel>(this.printers)
      this.printers.paginator = this.paginator;
      this.printers.sort = this.sort;

    });
  }


  filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.printers.filter = filvalue;

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

  /*searchdata(){
    debugger;
    this.printerServ.searhhdata(this.model).subscribe((res : any) => {
      this.printers = res;
      console.log(this.printers);
    })
  }*/

  logout() {
    this.auth.signOut();
  }

  setDelete(engenPrintersID: number) {

    this.printerServ.setDelete(engenPrintersID).subscribe({
      next: (res) => {
        alert('Printer Deleted Successfuly');
        this.showdata();
      },
      error: console.log,
    });
    //this.printers = this.printerServ.showdata();
  }

  openAddEditPrinterForm(){
    const dialogRef = this._dialog.open(PrinterAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.showdata();
        }
      },
    });
    /*this._dialog.open(PrinterAddEditComponent)*/
  }
  
  openEditForm(data : any) {
   const dialogRef = this._dialog.open(PrinterAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.showdata();
        }
      },
    });
  }

  searchdata() {
    debugger;
     this.api.searchdata(this.model).subscribe((res: any) => {
         this.printers=res;
         console.log(this.printers);
     })
   }

clearInput() {        
    this.model.printerName = "";

    this.model.printerMake = "";

    this.model.folderToMonitor = "";

    this.model.outputType = "";

    this.model.fileOutput = "";

    this.model.active = false;

    this.model.createTimeStamp = "";
    // window.location.reload();
}
   
clearFilters() {
  this.model.printerMake = null;

  this.model.startdate = null;

  this.model.enddate = null;

  //this.filteredPinters = [...this.dataSource];

  window.location.reload();
}

// column filters 

applyFilter(column: string, event: Event) {

  const filterValue = (event.target as HTMLInputElement).value;

  this.printers.filterPredicate = (data: any, filter: string) => {

    const value = data[column].toLowerCase();

    return value.includes(filter);

  };

  this.printers.filter = filterValue.trim().toLowerCase();

}

 
  /*DeletePrinter(id: number[]) {
    return this.http.delete('https://localhost:7165/api/Printers/delete-multiple', {
      params: {
        id: id
      }
    });
  }*/

  /*select(row: any) {
    this.printers.push(row.id);
}

  delete() {
    if(this.printers.length >  0) {
       this.http.delete('https://localhost:7165/api/Printers/delete-multiple', {
        params: {
          id : this.printers
        }
    }).subscribe(
      (response : any) => {
        if( response.status === 200) {
          this.printers.data = this.printers.data.filter(row => !this.printers.includes(row.id));
        }
    },
    (error : any) => {
      console.log(error);
         }
     );
    }
  }*/

  

   /*cleafilter(){
    this.printers.filter = '';
    this.startdate = '';
   }*/
 
 /* searchDataComponent() {
    debugger;
    this.api.search(this.model).subscribe((res: any) => {
      this.printers = res;
      console.log(this.printers);
    })
  }*/
 

  //new data

  /*addPrinter()
  {
    let bodydata = {
      "printerName" : this.printerName,
      "folderToMonitor" : this.folderToMonitor,
      "outputType" : this.outputType,
      "fileOutput" : this.fileOutput,
      "active" : this.active,
      "createTimeStamp" : this.createTimeStamp
    };
  
    this.http.post("https://localhost:7165/api/Printer/add",bodydata).subscribe((res :
       any)=>{
  
        console.log(res);
        alert("Printer addedd Successfully")
        this.showdata();
       }
    )
  }*/

  /*setUpdate(data : any)
  {
    this.printerName = data.printerName;
    this.folderToMonitor = data.folderToMonitor;
    this.outputType = data.outputType;
    this.fileOutput = data.fileOutput;
    this.active = data.active;
    this.createTimeStamp = data.createTimeStamp;

    this.EngenPrintersID = data.EngenPrintersID;
  }*/

  /*updateRecords()
  {
    let bodydata = 
    {
      "printerName" : this.printerName,
      "folderToMonitor" : this.folderToMonitor,
      "outputType" : this.outputType,
      "fileOutput" : this.fileOutput,
      "active" : this.active,
      "createTimeStamp" : this.createTimeStamp
    };

    this.http.put("https://localhost:7165/api/Printer/update" + "/" + 
    this.EngenPrintersID,bodydata).subscribe((res : any)=>
    {
      console.log(res);
      alert("printer updated Successfully")
      this.showdata();
    });
  }*/

  /*save()
  {
    if(this.EngenPrintersID == '')
    {
      this.addPrinter();
    }
    else{
        this.updateRecords();
    }
  }*/

  //where it ends
  
  

}
