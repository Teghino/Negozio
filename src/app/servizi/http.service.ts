import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  nome: string;
}
interface RispostaApi {
  oggetti: [];
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

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private servizio = 'http';
  private host = 'localhost';
  private porta = '3000';
  private api = '/api';
  private url = `${this.servizio}://${this.host}:${this.porta}${this.api}`;

  constructor(private http: HttpClient) { }

  login(username: any, password: any){
    return this.http.post<ApiResponse>(`${this.url}/login`, {username: username, password: password});
  }

  register(username: any, password: any, nome: any){
    return this.http.post<ApiResponse>(`${this.url}/register`, {username: username, password: password, nome: nome});
  }

  checkUser(email: any){
    return this.http.get(`${this.url}/checkUser/${email}`);
  }

  carrello(action: any, itemId: any, taglia: any){
    return this.http.post<CarrelloResponse>(`${this.url}/Carrello`, {action: action, itemId: itemId, taglia: taglia}, {withCredentials: true});
  }

  cercaTipi(tipologia: any, sesso: any){
    return this.http.post<RispostaApi>(`${this.url}/ricercaTipologie`, {tipologia: tipologia, sesso: sesso}, {withCredentials: true});
  }

  setTaglieDisponibili(idOggetto: any){
    return this.http.get(`${this.url}/prodotto/${idOggetto}`, {withCredentials: true});
  }
}
