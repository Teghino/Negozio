import {Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasNumber = /[0-9]+/.test(value);

    const hasMinimumLength = value.length >= 6;

    const passwordValid = hasUpperCase && hasNumber && hasMinimumLength;

    return passwordValid ? null : { passwordInvalid: true };
  };
}

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterModule
  ],
})
export class RegistrazioneComponent {
  @ViewChild('stepper') stepper?: MatStepper;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', [Validators.required, Validators.email]],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', [Validators.required, passwordValidator()]],
  });
  isLinear = false;

  mainForm = this._formBuilder.group({
    firstFormGroup: this.firstFormGroup,
    secondFormGroup: this.secondFormGroup,
    thirdFormGroup: this.thirdFormGroup
  });

  onSubmit() {
    this.http.post('http://localhost:3000/api/register',{
     'nome' : this.mainForm.value.firstFormGroup?.firstCtrl,
     'username' : this.mainForm.value.secondFormGroup?.secondCtrl,
     'password' : this.mainForm.value.thirdFormGroup?.thirdCtrl,
  }).pipe(
    catchError((error: any) => {
      console.error('Si è verificato un errore durante la registrazione:', error);
      if(error.status == 409){
        let secondFormGroup = this.mainForm.get('secondFormGroup');
        let secondCtrl = secondFormGroup ? secondFormGroup.get('secondCtrl') : null;
        if(secondCtrl){
          secondCtrl.setErrors({notExists: true});
          if (this.stepper) {
            this.stepper.selectedIndex = 1; // Cambia l'indice come necessario
          }
        }
      }
      return throwError(error);
    })
  ).subscribe((response) => {
      console.log(response);
    });
  }

  onSubmitUser(){
    this.http.get('http://localhost:3000/api/checkUser/' + this.mainForm.value.secondFormGroup?.secondCtrl
    ).subscribe((response: any) => {
      if(response.exists){
        let secondFormGroup = this.mainForm.get('secondFormGroup');
        let secondCtrl = secondFormGroup ? secondFormGroup.get('secondCtrl') : null;
        if(secondCtrl){
          secondCtrl.setErrors({notExists: true});
          if (this.stepper) {
            this.stepper.previous();
          }
        }
      }
    });
  }
}
