import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private carrelloSubject = new BehaviorSubject<{[key: string]: any}[]>([]);

  
  setCarrello(carrello: {[key: string]: any}, taglia: string) {
    let carrelloCopia = {...carrello}; // Crea una copia dell'oggetto 'carrello'
    carrelloCopia['taglia'] = taglia; // Aggiunge la proprietà 'taglia' alla copia
    let tmp = this.carrelloSubject.getValue();
    tmp.push(carrelloCopia); // Aggiunge la copia all'array
    this.carrelloSubject.next(tmp);
    console.log(tmp);
  }

  getCarrello(): Observable<{[key: string]: any}[]> {
    return this.carrelloSubject.asObservable();
  }

}
