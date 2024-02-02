import {Component, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { ImmagineService } from 'src/app/servizi/immagine.service';

interface MioOggetto {
  foto: string;
  // altre proprietà...
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    CommonModule,
    NgIf,
    MatButtonModule
  ],
})


export class PersonComponent implements OnInit{
  
  private imm: string = '';
  constructor(private immagine: ImmagineService, private http: HttpClient) {}

  ngOnInit(): void {
    this.immagine.getImmagine().subscribe(immagine => {
      this.imm = immagine;
    });
  }


  selectedItem: number | null = null;
  items = [
    {
      nome: 'Profilo',
      icon: 'person',
    },
    {
      nome: 'Impostazioni',
      icon: 'settings',
    }
  ];

  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }

  onUpload() {
    if (this.selectedFile) {
      console.log(this.selectedFile);
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post<MioOggetto>('http://localhost:3000/api/upload', formData, {withCredentials: true}).subscribe(response => {
        this.immagine.setImmagine(response.foto)
      }, error => {
        console.log(error);
      });
    } else {
      console.log('Nessun file selezionato');
    }
  }
}
