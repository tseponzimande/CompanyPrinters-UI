import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrinterService } from 'src/app/services/printer.service';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { printerModel } from 'src/app/Model/printerModel';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-printer-add-edit',
  templateUrl: './printer-add-edit.component.html',
  styleUrls: ['./printer-add-edit.component.scss']
})
export class PrinterAddEditComponent implements OnInit {

  printerForm !: FormGroup;

  printermakeOptions = [{ value: 'Canon', label: 'Canon' },
                        { value: 'Samsung', label: 'Samsung' },
                        { value: 'Epson', label: 'Epson' },
                       ];

  ngOnInit(): void {
    if(this.data){
      this.printerForm.controls['printerName'].setValue(this.data.printerName);
      this.printerForm.controls['printerMake'].setValue(this.data.printerMake);
      this.printerForm.controls['folderToMonitor'].setValue(this.data.folderToMonitor);
      this.printerForm.controls['outputType'].setValue(this.data.outputType);
      this.printerForm.controls['fileOutput'].setValue(this.data.fileOutput);
      this.printerForm.controls['active'].setValue(this.data.active);     
      //this.printerForm.controls['fileOutput'].setValue(this.data.fileOutput);
      //createTimeStamp 
    }
  }

  constructor(private _fb : FormBuilder,
    private _api : ApiService, 
    private _printerService: PrinterService, 
    private _dialogRef: DialogRef<PrinterAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {                                                 
    this.printerForm = this._fb.group ({
      printerName : ['',Validators.required],
      printerMake : ['',Validators.required],
      folderToMonitor : ['',Validators.required],
      outputType : ['',Validators.required],
      fileOutput : ['',Validators.required],
      active : ['',Validators.required],
      createTimeStamp : [new Date(), Validators.required],
    });
  }

  selectedOption: string;


  onFormSubmit(event: Event) {

    event.preventDefault();

    console.log('Form Values:', this.printerForm.value);
    
    if (this.printerForm.valid) {

      const formData = this.printerForm.value;  
  
      const activeValue = formData.active === 'true' ? true : false;
  
      const updatedPrinter = {
  
        engenPrintersID: this.data ? this.data.engenPrintersID : 0,
  
        printerName: formData.printerName,
  
        printerMake: formData.printerMake,
  
        folderToMonitor: formData.folderToMonitor,
  
        outputType: formData.outputType,
  
        fileOutput: formData.fileOutput,
  
        active: activeValue,
  
        //dateCreated: formData.dateCreated.toISOString(),
  
       dateCreated: formData.dateCreated,
  
      };

      if (this.data) {
        this._printerService.updatePrinter(this.data.engenPrintersID, this.printerForm.value).subscribe({
          next: (val: any) => {
            console.log('API call successful:', val);
            alert('printer updated successfully');
            window.location.reload();
            this._dialogRef.close();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        //console.log(this.printerForm.value);
        this._api.AddPrinter(this.printerForm.value).subscribe({
          next: (val: any) => {
            console.log('api call successful');
            alert('printer added successfully');
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
}


  
 



