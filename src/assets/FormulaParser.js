'use strict'

var parser = require('./parser.js') //импорт сгенерированного парсера

function test(){
  alert('Hello!');
}

module.exports = class FormulaParser {
  constructor (StringVarName, NumberVarName) {
    this.StringVarName = StringVarName //имена строковых переменных
    this.NumberVarName = NumberVarName //имена числовых переменных
    this.StringVarNameAutoComplite = [] //имена строковых переменных преобразованный в формат для автокомплита 'varname' -> '"varname" '
    this.NumberVarNameAutoComplite = [] //имена числовых переменных преобразованный в формат для автокомплита 'varname' -> '"varname" '

    //заполняем массив с названием переменных для автокомплита
    StringVarName.forEach(element => {
      this.StringVarNameAutoComplite.push('"'.concat(element, '" '))
    })
    NumberVarName.forEach(element => {
      this.NumberVarNameAutoComplite.push('"'.concat(element, '" '))
    })
  }

  //////////////////////////
  //parse (line, position) обнаруживает ошибки и генерирует массив срок с автоктмплитом
  //line - строка анализируемого текста
  //line - позиция курсора (для автокмоплита)
  //////////////////////////

  parse (line, position) {
    var hasError = true //результат обнаружения ошибок
    var autocomplite = [] //результирующий массив для автокомплита
    try {
      //парсим полную строку для получения ошибок
      parser.parse(line.trim(), {
        StringVarName: this.StringVarName,
        NumberVarName: this.NumberVarName
      })
      hasError = false
    } catch (e) {
      if (e.name === 'SyntaxError') {
        //генерируем сообщение об ошибке
        var errorMessage = e.message
          .replace('Expected', 'Ожидалось:')
          .replace('found', 'обнаружен')
          .replace('or', 'или')
          .replace(' but', ', но')
          .replace('end of input', 'конец строки')
      }
    }
    try {
      //парсим строку для получения массива автокомплита
      parser.parse(line.slice(0, position), {
        StringVarName: this.StringVarName,
        NumberVarName: this.NumberVarName
      })
    } catch (e) {
      if (e.name === 'SyntaxError') {
        //генерируем автокомплит
        e.expected.forEach(element => {
          switch (element.type) {
            case 'literal':
              autocomplite.push(element.text)
              break
            case 'class':
              if (element.parts.toString() === '0,9') {
                Array.prototype.push.apply(autocomplite, [
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9
                ])
              }
              break
            case 'other':
              switch (element.description) {
                case 'StringVar':
                  Array.prototype.push.apply(
                    autocomplite,
                    this.StringVarNameAutoComplite
                  )
                  break
                case 'IntegerVar':
                  Array.prototype.push.apply(
                    autocomplite,
                    this.NumberVarNameAutoComplite
                  )
                  break
              }
          }
        })
      }
    }

    return {
      hasError: hasError,
      autocomplite: autocomplite.filter((v, i, a) => a.indexOf(v) === i),
      errorMes: hasError ? errorMessage : null
    }
  }
}
