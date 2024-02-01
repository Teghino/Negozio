import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  constructor(private httpService: HttpService, private http: HttpClient) { }
  private carrelloSubject = new BehaviorSubject<{[key: string]: any}[]>([]);

  
  setCarrello(carrello: {[key: string]: any}, taglia: string, numero: number = 1) {
    let carrelloCopia = {...carrello}; // Crea una copia dell'oggetto 'carrello'
    carrelloCopia['taglia'] = taglia; // Aggiunge la proprietà 'taglia' alla copia
    carrelloCopia['numero'] = numero; // Aggiunge la proprietà 'numero' alla copia
    let tmp = this.carrelloSubject.getValue();
    tmp.push(carrelloCopia); // Aggiunge la copia all'array
    this.carrelloSubject.next(tmp);
    console.log(tmp);
  }

  addCarrello(carrello: {[key: string]: any}, taglia: string, numero: string) {
    this.httpService.carrello('add', numero, taglia).subscribe((response) => {
        console.log(response);
      }
    );
    let carrelloCopia = {...carrello}; // Crea una copia dell'oggetto 'carrello'
    carrelloCopia['taglia'] = taglia; // Aggiunge la proprietà 'taglia' alla copia
    let tmp = this.carrelloSubject.getValue();
    let foundItem = tmp.find(item => item['id'] === carrelloCopia['id'] && item['taglia'] === taglia);
    if (foundItem) {
      // Se l'elemento esiste già, incrementa solo il suo numero
      // Se l'elemento esiste già, incrementa solo il suo numero
      foundItem['numero'] += parseInt(numero);
    } else {
      // Se l'elemento non esiste, aggiungilo al carrello
      carrelloCopia['numero'] = 1 // Aggiunge la proprietà 'numero' alla copia
      tmp.push(carrelloCopia);
    } // Aggiunge la copia all'array
    this.carrelloSubject.next(tmp);
    console.log(tmp);
  }

  getCarrello(): Observable<{[key: string]: any}[]> {
    return this.carrelloSubject.asObservable();
  }

}
