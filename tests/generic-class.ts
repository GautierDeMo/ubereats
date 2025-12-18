class HandleString {
  data: string[]
}

class HandleNumber {
  data: number[]
}

const handleString1 = new HandleString()
// handleString1.data.push('toto', 23) // impossible, seulement une string
handleString1.data.push('toto')

const handleNumber1 = new HandleNumber()
// handleNumber1.data.push('toto', 23) //impossible, seulement un number
handleNumber1.data.push(23)

/** On ne peut pas gérer deux types à la fois
avec un seul Handler, ou une seule classe et un seul champ => utilisation des
classes génériques comme ci-dessous pour qu'un seul handler puisse gérer plusieurs
types */

class HandleAnything<T> {
  data: T[]
}

const handleString2 = new HandleAnything<string>()
handleString2.data.push('toto')

const handleNumber2 = new HandleAnything<number>()
handleNumber2.data.push(23)
