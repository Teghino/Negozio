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


/**
 * @title Stepper vertical
 */
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
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
export class StepperVerticalExample{
  @ViewChild('stepper') stepper?: MatStepper;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

  mainForm = this._formBuilder.group({
    fisrtFormGroup: this.firstFormGroup,
    secondFormGroup: this.secondFormGroup,
    thirdFormGroup: this.thirdFormGroup
  });

  onSubmit() {
    this.http.post('http://localhost:3000/api/login',{
     'username' : this.mainForm.value.secondFormGroup?.secondCtrl,
     'password' : this.mainForm.value.thirdFormGroup?.thirdCtrl,
  }).pipe(
    catchError((error: any) => {
      console.error('Si è verificato un errore durante la registrazione:', error);
      if(error.status == 400){
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

}
