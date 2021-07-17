import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface Elemento {
  id?: string;
  name: string;
  detalhes?: string;
  url?: string;
  musica?: Musica;
  integrante?: Integrante;
}

export interface Musica {
  nome: string;
  autor: string;
  url_partitura: string;
  letra: string;
}
export interface Integrante {
  nome: string;
}

@Injectable({  providedIn: 'root'})
export class PostDataService {
  private elementos: Observable<any[]>;
  private elementosCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) { }

  setCollection(type) {
    this.elementosCollection = this.afs.collection<any>(type);

    this.elementos = this.elementosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return { id, ...data };
        });
      })
    );
  }

  getElements() {
    return this.elementos.pipe(map(data => {
      console.log(data.sort( (a, b) => {
        return b['timestamp '] - a['timestamp '];
      }));

      return data;
    }));
  }

  getElement(id: string): Observable<any> {
    return this.elementosCollection.doc<any>(id).valueChanges().pipe(
      take(1),
      map(elemento => {
        elemento.id = id;
        return elemento;
      })
    );
  }

  addElemento(elemento: any) {
    elemento['timestamp '] = Date.now();
    return this.elementosCollection.add(elemento);
  }

  updateElemento(elemento: any) {
    return this.elementosCollection.doc(elemento.id).update({name: elemento.name, detalhes: elemento.detalhes});
  }

  deleteElemento(id: string) {
    return this.elementosCollection.doc(id).delete();
  }

}
