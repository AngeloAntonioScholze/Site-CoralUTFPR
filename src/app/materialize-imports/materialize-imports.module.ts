import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzNavbarModule } from 'ngx-materialize';
import { MzSidenavModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzDatepickerModule } from 'ngx-materialize';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MzNavbarModule,
    MzSidenavModule,
    MzIconModule,
    MzIconMdiModule,
    MzInputModule,
    MzDatepickerModule
  ],
  exports: [
    MzNavbarModule,
    MzSidenavModule,
    MzIconModule,
    MzIconMdiModule,
    MzInputModule,
    MzDatepickerModule
  ]
})
export class MaterializeImportsModule { }
