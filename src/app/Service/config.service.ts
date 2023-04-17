import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './UserInformation';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  localURL = 'https://localhost:7182/api';

  constructor(private http: HttpClient) { }

  handleError : any;

  GetData(methodName : any, methodType : any){
    debugger;

    const URL = this.localURL + '/' + methodName;
    
    
    var token = 'Bearer '+ localStorage.getItem('token');
    const headersOptions : any = {headers: new HttpHeaders({'Content-Type':'application/json','Authorization': token})};    
    
    return this.http.request(methodType, URL, headersOptions)
      .pipe(catchError(this.handleError))
  } 

  GetLoginInformation(methodName : any, methodType : any){
    const URL = this.localURL + '/' + methodName;

    return this.http.request(methodType, URL)
      .pipe(catchError(this.handleError));

  }

  PostData(methodName : any, methodType: any , body: any) {  
    const URL = this.localURL + '/' + methodName;
    console.log('post', URL)
    var token = 'Bearer ' + localStorage.getItem('token');

    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    // headers = headers.set('Authorization',  token);

    const headersOptions : any = {headers: new HttpHeaders({'Content-Type':'application/json','Authorization': token})};

    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    console.log('post2 ', body)
    return this.http.post(URL, body, headersOptions)
    .pipe(
      catchError(this.handleError)
    );
    
} 



}
