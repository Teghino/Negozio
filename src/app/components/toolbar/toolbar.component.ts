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
import {MatBadgeModule} from '@angular/material/badge';
import { CarrelloService } from 'src/app/servizi/carrello.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from 'src/app/servizi/http.service';
import { ImmagineService } from 'src/app/servizi/immagine.service';
interface RispostaApi {
  foto: string;
}

interface Oggetto {
  id: number;
  nome: string;
  prezzo: number;
  sesso: string;
  descrizione: string;
  foto: string;
}

interface Taglia {
  id: number;
  nome: string;
}

interface CarrelloItem {
  id: number;
  emailUtente: string;
  idOggetto: number;
  idTaglia: number;
  numero: number;
  oggetti: Oggetto;
  taglie: Taglia;
}

interface CarrelloResponse {
  success: boolean;
  message: string;
  carrello: CarrelloItem[];
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, NgIf, MatMenuModule, MatBadgeModule],
})
export class ToolbarComponent implements OnInit, OnDestroy{
  @Input() sidenav: MatSidenav | undefined;
  isLogged: boolean;
  public oggetti = [];
  user: Users;
  private storageSub!: Subscription;
  public imageUrl: any;
  private numero: number = 0;

  constructor(private immagine: ImmagineService, private httpService: HttpService, private cookie: CookieService, private carrello: CarrelloService, private http: HttpClient, private location: Location, private localStorageService: LocalStorageService, private sanitizer: DomSanitizer, private attributiOggettiService: AttributiOggettiService, private router: Router) {
    const utente = JSON.parse(localStorage.getItem('utente') || '{}');
    this.user = new Users(utente.name, utente.isLogged);
    this.isLogged = this.user.getIsLoggedUser;
    this.updateUserFromLocalStorage();
  }

  ngOnInit(): void {
    this.immagine.getImmagine().subscribe(immagine => {
      this.imageUrl = immagine;
    });
    this.carrello.getCarrello().subscribe(carrello => {
      let total = 0;
      for (let item of carrello) {
        total += item['numero'];
      }
      this.numero = total;
    });
    this.httpService.carrello('get', '', '').subscribe(
      (response) => {
        console.log(response);
        response.carrello.forEach(item => {
          this.carrello.setCarrello(item.oggetti, item.taglie.nome, item.numero);
        });
      }
    );
    this.storageSub = this.localStorageService.watchStorage().subscribe(() => {
      this.updateUserFromLocalStorage();
    });
    this.http.post<RispostaApi>('http://localhost:3000/api/user/image', {}, {withCredentials: true}).subscribe(data => {
      this.immagine.setImmagine(data.foto);
      console.log(data)
    }, error => {
      console.log(error);
      this.imageUrl = null;
    });

  }

  getNumero() { 
    return this.numero;
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
    this.httpService.cercaTipi(categoria, sesso).subscribe(data => {
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
