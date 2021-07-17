import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageApiService {

  constructor(private storage: AngularFireStorage) { }

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  uploadFile(caminho, file) {
    const ref =  this.storage.ref(caminho + '/' + file.name);
    // const task = ref.put(file)
    ref.put(file).then(() => {
        ref.getDownloadURL().subscribe( url => {
          console.log(url);
        });
     });

    // finalize(() => this.downloadURL = ref.getDownloadURL() )
  }
}
