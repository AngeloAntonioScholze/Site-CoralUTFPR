import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ExerciciosMusicaisComponent } from './exercicios-musicais/exercicios-musicais.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { EventosComponent } from './eventos/eventos.component';
import { InscricoesComponent } from './inscricoes/inscricoes.component';
import { PesquisasComponent } from './pesquisas/pesquisas.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'exerciciosMusicais',
    component: ExerciciosMusicaisComponent
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'eventos',
    component: EventosComponent
  },
  {
    path: 'inscricoes',
    component: InscricoesComponent
  },
  {
    path: 'pesquisa',
    component: PesquisasComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
