import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttributiOggettiService } from '../../servizi/attributi-oggetti.service';

@Component({
  selector: 'app-oggetto-evidenziato',
  templateUrl: './oggetto-evidenziato.component.html',
  styleUrls: ['./oggetto-evidenziato.component.css']
})
export class OggettoEvidenziatoComponent implements OnInit{
[x: string]: any;
  constructor(private route: ActivatedRoute, private attributiOggettiService: AttributiOggettiService) { }

  id: string = '';
  oggetto: any;
  taglie = ['XS', 'S', 'M', 'L', 'XL'];
  tagliDisponibili: any;
  tagliaSelezionata: string = '';
  

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.attributiOggettiService.getOggetti().subscribe(oggetti => {
      if (oggetti) {
        this.oggetto = oggetti.find((oggetto: any) => oggetto.id == this.id);
        console.log(this.oggetto);
        console.log(oggetti);
        console.log(this.id);
      } else {
        this.oggetto = {};
      }
    });
    this.attributiOggettiService.getTaglieDisponibili().subscribe(taglie => {
      this.tagliDisponibili = taglie;
      console.log(this.tagliDisponibili);
    });
  }


  addCart(oggetto: any) {
    console.log('aggiunto al carrello'+ ' ' + oggetto.nome);
  }

  selezionaTaglia(taglia: string) {
    this.tagliaSelezionata = taglia;
  }

}