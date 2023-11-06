import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';
import { Printer } from 'typescript';
import { Observable, Subject,tap } from 'rxjs';
import { printerModel } from 'src/app/Model/printerModel';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  
  private _refreshrequired=new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }
  
  //Url?: string; 
  private updatePrinterUrl : string = 'https://localhost:7165/api/Printer/update/';

  private printerDetails : string = 'https://localhost:7165/api/Printers';

  private filterdate : string = 'https://localhost:7165/api/Printers/search';

  constructor(private http : HttpClient) { 
  }

  /*search(model : any){  
   return this.http.post<any>('https://localhost:7165/api/Searchdata/search',model);    
  }*/
  showdata(): Observable<printerModel>{  
   return this.http.get<printerModel>(this.printerDetails);    
  }  

  setDelete(engenPrintersID : number): Observable<any>{
    return this.http.delete(`https://localhost:7165/api/Printers/${engenPrintersID}`);
  }
  
  updatePrinter(engenPrintersID : number, data : any): Observable<any>{
    return this.http.put(`https://localhost:7165/api/Printers/${engenPrintersID}`,data);
  }

  AddPrinter(data : any): Observable<any> {
    return this.http.post(`https://localhost:7165/api/Printers/ADD`,data)
  }



  /*deletePrinter(printer : Printer){
    return this.http.delete('https://localhost:7165/api/Printer/DeletePrinter/' + printer);
  }*/

  /*delPrinter(id : number){
    const url = 'https://localhost:7165/api/Printer/DeletePrinter/${id}';
    return this.http.delete(url + id);
  }*/

  /*filterData(startDate: string, endDate: string){
    return this.http.get<any[]>('${this.searchDataUrl}/api/data/filter?startDate=${startDate}&endDate=${endDate}');
  }*/
  
}
