import { HttppostService } from '../services/httppost.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostDataService, Elemento } from '../services/post-data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {
  logado = true;
  constructor(private storage: AngularFireStorage, private postDataService: PostDataService, public afAuth: AngularFireAuth, private service: HttppostService) {
    this.postDataService.setCollection('videos');
    this.videos$ = this.postDataService.getElements();
  }

  videos$;
  videoForm = new FormGroup({
    video_title: new FormControl(),
    video_url: new FormControl(),
    video_description: new FormControl(),
  });

  elemento = {
    name: '',
    url: '',
    description: '',
    imagem: '',
  };
  files = {
    video_imagem: '',
  };

  onSubmit() {
    if (this.videoForm.get('video_title').value != null && this.videoForm.get('video_url').value != null && this.videoForm.get('video_description').value != null) {
      this.elemento.name = this.videoForm.value.video_title;
      this.elemento.url = this.videoForm.value.video_url;
      this.elemento.description = this.videoForm.value.video_description;
      this.postDataService.addElemento(this.elemento);

      this.videoForm = new FormGroup({
        video_title: new FormControl(),
        video_url: new FormControl(),
        video_description: new FormControl(),
      });

      const notification = {
        title: 'Vídeos!',
        body: this.elemento.name,
      };
      this.service.enviaPush(notification);

    } else {
      alert('Algum campo está vazio. ');
    }
  }
  pega_imagem_no_template(templateVar) {

    console.log(templateVar.files[0].name);

    switch (templateVar.name) {
      case 'imagem_editor':
        this.files.video_imagem = templateVar.files[0];
        const ref =  this.storage.ref('/video/' + templateVar.files[0].name);
        ref.put(this.files.video_imagem).then( () => {
           ref.getDownloadURL().subscribe( url => {
             this.elemento.imagem = url;
           });
        });
        break;
    }
  }

  exclui_elemento(elementoId) {
    this.postDataService.deleteElemento(elementoId);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.logado = false;
  }
}
