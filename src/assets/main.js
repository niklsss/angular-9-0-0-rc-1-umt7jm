'use strict'

const FormulaParser = require('./FormulaParser.js')

var StringVarName = ['тип груза', 'страна'] //имена строковых пременных (приходят от бэкенда)
var NumberVarName = ['страхвая сумма', 'страхвая премия'] //имена числовых пременных (приходят от бэкенда)

var proc = new FormulaParser(StringVarName, NumberVarName) //инициализация парсера

var code = '1=1 или 2=1' //пример разбираемой строчки
var cursorPosition = 5 //позиция курора (нужна для автокомплита)

console.log(proc.parse(code, cursorPosition))
