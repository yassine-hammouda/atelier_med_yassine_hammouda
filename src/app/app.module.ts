import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // AJOUTÉ

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestionAtelierComponent } from './gestion-atelier/gestion-atelier.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionAtelierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule // AJOUTÉ
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }