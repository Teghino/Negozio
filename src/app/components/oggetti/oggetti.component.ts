import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AttributiOggettiService } from '../../servizi/attributi-oggetti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oggetti',
  templateUrl: './oggetti.component.html',
  styleUrls: ['./oggetti.component.css']
})
export class OggettiComponent {
  tipo: string | undefined;
  sesso: string | undefined;
  oggetti: any;
  constructor( private http: HttpClient, private attributiOggettiService: AttributiOggettiService, private router: Router) { }

  

  ngOnInit() {
    this.attributiOggettiService.getCategoria().subscribe(categoria => {
      this.tipo = categoria;
    });
    
    this.attributiOggettiService.getSesso().subscribe(sesso => {
      this.sesso = sesso;
    });
    this.attributiOggettiService.getOggetti().subscribe(oggetti => {
      this.oggetti = oggetti;
    });
    console.log(this.tipo);
    console.log(this.sesso);
    console.log(this.oggetti);
    
  }

  send(id: string){
    this.attributiOggettiService.setTaglieDisponibili(id);
  }
}
