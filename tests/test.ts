class Toto {
  done() {}
}

class Titi {
  done() {}
}

// Vu que tata n'a pas la méthode 'done()', il ne peut pas être dans cet array
// class Tata {}

const arr = [new Toto(), new Titi(), /** new Tata() */]

arr.forEach(instance => {
  instance.done()
})
