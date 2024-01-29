import {Component, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

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
export class PersonComponent {


  constructor(private http: HttpClient) {}


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
      this.http.post('http://localhost:3000/api/upload', formData, {withCredentials: true}).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
    } else {
      console.log('Nessun file selezionato');
    }
  }
}
