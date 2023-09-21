import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Blacklisted} from "../blacklisted";

// Http option
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = '/api';

  constructor(private http: HttpClient) { }

  addStudent(cardNumber: number) {
    const url = `${this.apiUrl}/add_card`
    console.log(url)
    return this.http.post(url, { "card_number" : cardNumber},httpOptions)
  }

  checkIfStudent(cardNumber: number) {
    const url = `${this.apiUrl}/check_access/${cardNumber}`
    console.log(url)
    return this.http.get<Blacklisted>(url,httpOptions)
  }

}
