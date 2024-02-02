import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImmagineService {
  private immagine: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setImmagine(immagine: string) {
    this.immagine.next(immagine);
  }

  getImmagine(): Observable<string> {
    return this.immagine.asObservable();
  }
  constructor() { }
}
