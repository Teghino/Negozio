import { Component, OnInit } from '@angular/core';
import { CarrelloService } from 'src/app/servizi/carrello.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit{
  private carrello: {[key: string]: any}[] = [];

  constructor(private carrelloService: CarrelloService) { }
  ngOnInit(): void {
    this.carrelloService.getCarrello().subscribe((carrello) => {
      console.log(carrello);
      this.carrello = carrello;
    });
  }

  getCarrello() {
    return this.carrello;
  }

  getTotale() {
    let totale = 0;
    for (let i = 0; i < this.carrello.length; i++) {
      totale += this.carrello[i]['prezzo'] * this.carrello[i]['numero'];
    }
    return totale;
  }
}
