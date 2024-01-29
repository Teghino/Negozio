import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private carrelloSubject = new BehaviorSubject<{[key: string]: any}[]>([]);
  
  

}
