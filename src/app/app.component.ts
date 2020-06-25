import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import FormulaParser from '../assets/FormulaParser.js';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  result: any;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  StringVarName = ['тип груза', 'страна'] //имена строковых пременных (приходят от бэкенда)
  NumberVarName = ['страхвая сумма', 'страхвая премия'] //имена числовых пременных (приходят от бэкенда)
  proc = new FormulaParser(this.StringVarName, this.NumberVarName);
  code;
  cursorPosition;

  constructor(){
  }

  ngOnInit(){
    this.code = '1=1 или 2=1'; //пример разбираемой строчки
    this.cursorPosition = 0; //позиция курора (нужна для автокомплита)
    // console.log(this.proc.parse(this.code, this.cursorPosition))
    this.result = this.proc.parse(this.code, this.cursorPosition);

    this.filterOptions();
  }

  filterOptions(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] { 
    const filterValue = value.toString();
    return this.result.autocomplite.filter(option => option.toString());
  }

  getIndex(event){
    this.result = this.proc.parse(event, 1);
  }

  change(event){
    this.result = this.proc.parse(event.target.value, event.target.value.length);
    console.log(this.result);
    this.filterOptions();
  }
}
