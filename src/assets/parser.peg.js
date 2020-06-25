{
  var StringVarName = options.StringVarName
  var NumberVarName = options.NumberVarName
}

BoolExpression
 = head:BoolTerm tail:(_ ("или"i / "и"i) _ BoolTerm)*


BoolTerm
 = ("(" _ (BoolExpression) _ ")") / (BoolString / BoolNumber)

BoolString
  = line:StringVar _ ("=" / "!=") _ String { return line; }

StringVar "StringVar"
  =_ "\"" str1:([^\"] *)&{return StringVarName.indexOf(str1.join('')) > -1} "\"" { return str1.join(''); }
  
IntegerVar "IntegerVar"
  =_ "\"" str1:([^\"] *)&{return NumberVarName.indexOf(str1.join('')) > -1} "\"" { return str1.join(''); }

String "String"
  =_ "\"" str1:([^\"] *) "\"" { return str1.join(''); }
  
BoolNumber
  = line:(ArithmeticExpression _ ("=" / "!=" / ">=" / ">" / "<=" / "<") _ ArithmeticExpression) { return line; }

ArithmeticExpression
  = head:ArithmeticTerm tail:(_ ("+" / "-") _ ArithmeticTerm)* 

ArithmeticTerm
  = head:arithmeticFactor tail:(_ ("*" / "/") _ arithmeticFactor)* 

arithmeticFactor
  = "(" _ expr:ArithmeticExpression _ ")" { return expr; }
  / (Number / IntegerVar)

Number 
  = _ num:("-"? [0-9]+ ("."[0-9]+)?) (_ ("usd"i / "eur"i / "rub"i))? { return num.join(''); }

_ "whitespace"
  = [ \t\n\r]*