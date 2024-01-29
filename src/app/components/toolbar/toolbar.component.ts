import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenav} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Users } from 'src/app/userModel';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../servizi/localStorage.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { AttributiOggettiService } from '../../servizi/attributi-oggetti.service';
import { Router } from '@angular/router';

interface RispostaApi {
  oggetti: [];
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, NgIf, MatMenuModule],
})
export class ToolbarComponent implements OnInit, OnDestroy{
  @Input() sidenav: MatSidenav | undefined;
  isLogged: boolean;
  public oggetti = [];
  user: Users;
  private storageSub!: Subscription;
  public imageUrl: any;

  constructor(private http: HttpClient, private location: Location, private localStorageService: LocalStorageService, private sanitizer: DomSanitizer, private attributiOggettiService: AttributiOggettiService, private router: Router) {
    const utente = JSON.parse(localStorage.getItem('utente') || '{}');
    this.user = new Users(utente.name, utente.isLogged);
    this.isLogged = this.user.getIsLoggedUser;
    this.updateUserFromLocalStorage();
  }

  ngOnInit(): void {
    this.storageSub = this.localStorageService.watchStorage().subscribe(() => {
      this.updateUserFromLocalStorage();
    });
    this.http.post('http://localhost:3000/api/user/image', {}, {withCredentials: true, responseType: 'blob' }).subscribe(data => {
      let blob = new Blob([data], { type: 'image/png' });
      let url = window.URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      console.log(this.imageUrl)
    }, error => {
      console.log(error);
      this.imageUrl = null;
    });

  }

  ngOnDestroy(): void {
    if (this.storageSub) {
      this.storageSub.unsubscribe();
    }
  }

  updateUserFromLocalStorage(): void {
    const utente = JSON.parse(localStorage.getItem('utente') || '{}');
    this.user = new Users(utente.name, utente.isLogged);
    this.isLogged = this.user.getIsLoggedUser;
  }
  
  aprichiudi() {
    this.sidenav?.toggle();
  }

  setCs(categoria: string, sesso: string) {
    console.log(categoria);
    console.log(sesso);
    this.http.post<RispostaApi>('http://localhost:3000/api/ricercaTipologie', {tipologia: categoria, sesso: sesso}, {withCredentials: true}).subscribe(data => {
      console.log(data);
      this.oggetti = data.oggetti;
      this.attributiOggettiService.setCategoria(categoria);
      this.attributiOggettiService.setSesso(sesso);
      this.attributiOggettiService.setOggetti(this.oggetti);
    console.log(this.oggetti);
    }, error => {
      console.log(error);
    });
    
  }


}
