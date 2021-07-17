// Modulos Angular
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeImportsModule} from './materialize-imports/materialize-imports.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
// Modulos Externos
import { QuillModule } from 'ngx-quill';
import { AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth}  from 'firebase/app';

// Componentes
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { ExerciciosMusicaisComponent } from './exercicios-musicais/exercicios-musicais.component';
import { HomeComponent } from './home/home.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { VideosComponent } from './videos/videos.component';
import { EventosComponent } from './eventos/eventos.component';
import { PesquisasComponent } from './pesquisas/pesquisas.component';
import { InscricoesComponent } from './inscricoes/inscricoes.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ExerciciosMusicaisComponent,
    HomeComponent,
    VideosComponent,
    EventosComponent,
    PesquisasComponent,
    InscricoesComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    MaterializeImportsModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
