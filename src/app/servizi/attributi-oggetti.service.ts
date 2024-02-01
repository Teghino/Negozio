import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class AttributiOggettiService {
  constructor(private httpService: HttpService, private http: HttpClient, private router: Router) { }

  private categoriaSubject = new BehaviorSubject<string | undefined>(undefined);
  private sessoSubject = new BehaviorSubject<string | undefined>(undefined);
  private oggettiSubject = new BehaviorSubject<{[key: string]: any}[]>([]);
  private taglieDisponibili = new BehaviorSubject<string[]>([]);

  setTaglieDisponibili(id: string) {
    this.httpService.setTaglieDisponibili(id).subscribe((data: any) => {
      const nomiTaglie = data.taglie.map((taglia: {nome: string}) => taglia.nome);
      this.taglieDisponibili.next(nomiTaglie)
      this.router.navigate(['/oggetti/evidenziato', id]);
    });
  }

  getTaglieDisponibili() {
    return this.taglieDisponibili.asObservable();
  }

  getCategoria() {
    return this.categoriaSubject.asObservable();
  }

  getSesso() {
    return this.sessoSubject.asObservable();
  }

  setCategoria(categoria: string | undefined) {
    this.categoriaSubject.next(categoria);
  }

  setSesso(sesso: string | undefined) {
    this.sessoSubject.next(sesso);
  }

  getOggetti(): Observable<{[key: string]: any}[]> {
    return this.oggettiSubject.asObservable();
  }

  setOggetti(oggetti: any) {
    this.oggettiSubject.next(oggetti);
  }
}