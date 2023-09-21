import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ApiService} from "./service/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Variables
  color = 'blanc'

  // Form control
  cardNumberFormControl = new FormControl()

  // Constructor
  constructor(private apiService: ApiService) {
  }

  // OnEnter
  onEnter(e: any) {
    if (e.code == 'Enter') this.check()
  }

  // Check
  check() {
    console.log(this.cardNumberFormControl.value)

    this.apiService.checkIfStudent(this.cardNumberFormControl.value).subscribe(data => {
      if(data.has_access) {
        this.apiService.addStudent(this.cardNumberFormControl.value)
          .pipe(catchError(error => this.handleError(error)))
          .subscribe(() => this.color = 'green')
      } else {
        this.color = 'red'
      }
    })


  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      this.color = 'orange'
      console.error('Erreur 409: La ressource existe déjà.', error);
    } else {
      // Gérer d'autres types d'erreur ou une erreur générique
      console.error(`Erreur ${error.status}: ${error.message}`);
    }
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }

}
