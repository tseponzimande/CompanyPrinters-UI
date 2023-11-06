import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { Printer } from 'typescript';
import { printerModel } from '../Model/printerModel';
import { userModel } from 'src/app/Model/userModel'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Url?: string;
  private filterWithDates : string = 'https://localhost:7165/api/Printers/search';
  //private baseUrl: string = 'https://localhost:7006/api/User/';
  private baseUrl: string = 'https://localhost:7165/api/User/';
  //private PrinterUrl: string = 'https://localhost:7006/api/';
  private PrinterUrl: string = 'https://localhost:7165/api/Printers';

  private multiDelUrl: string = 'https://localhost:7165/api/Printers/delete-multiple';
  //new data start here 
  private updatePrinterUrl : string = 'https://localhost:7165/api/Printer/update/';
  //ends here 

  constructor(private http: HttpClient) {}

  getUsers() : Observable<userModel> {
    return this.http.get<userModel>(this.baseUrl);
  }

  getPrinters(){
    return this.http.get<any>(this.PrinterUrl);
  }
  //new data start here
  /*AddPrinter(data : any): Observable<any> {
    return this.http.post('https://localhost:7165/api/Printer/add',data)
  }*/

  AddPrinter(data : any): Observable<any> {
    return this.http.post('https://localhost:7165/api/Printers/ADD',data)
  }

  /*updatePrinter(engenPrintersID : number, data : any): Observable<any>{
    return this.http.put(`https://localhost:7165/api/Printer/update/${engenPrintersID}`,data);
  }*/

  updatePrinter(engenPrintersID : number, data : any): Observable<any>{
    return this.http.put(`https://localhost:7165/api/Printers/${engenPrintersID}`,data);
  }

  /*searchdata(model : any){
    debugger;
   return this.http.post<any>('https://localhost:7165/api/Searchdata/search',model);
  }*/
  searchdata(model : any){
    debugger;
   return this.http.post<any>('https://localhost:7165/api/Printers/search',model);
  }

  AddUser(data : any): Observable<any> {
    return this.http.post('https://localhost:7165/api/User/register/',data);
  }

  updateUser(id : number, data : any): Observable<any>{
    return this.http.put(`https://localhost:7165/api/User/${id}`,data);
  }

  DeleteUser(id : number): Observable<any>{
    return this.http.delete(`https://localhost:7165/api/User/${id}`);
  }

  multiDelete(id : number[]) {
    /*return this.http.delete(`https://localhost:7165/api/Printers/delete-multiple/${id}`);*/
    return this.http.delete(`${this.multiDelUrl}`, {
      params : {
        id: id
      }
   });
}

  /*search(model : any): Observable<any>{
      return this.http.get<any>('https://localhost:7165/api/Searchdata/filteredData', model);
  }*/

  /*deletePrinter(printer : Printer){
    return this.http.delete('https://localhost:7165/api/Printer/DeletePrinter/' + printer);
  }*/


  //ends here

}
