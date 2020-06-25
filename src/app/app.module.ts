import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';

import { DemoMaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, DemoMaterialModule ],
  declarations: [ AppComponent, ChildComponent ],
  bootstrap:    [ AppComponent ], 
})
export class AppModule { }
