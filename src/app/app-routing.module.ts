import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperVerticalExample } from './components/login/stepper.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';


const routes: Routes = [
  {path: '', component: RegistrazioneComponent},
  {path: 'login', component: StepperVerticalExample}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
