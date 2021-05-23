const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.splice() : Object.values(collection)

      for (let i = 0; i < newCollection.length; i++){
        callback(newCollection[i])
      }
      return collection
    },

    map: function(collection, callback) {
      if (!(collection instanceof Array)){
        collection = Object.values(collection)
      }
      const newCollection = []

      for (let i = 0; i < collection.length; i++){
        newCollection.push(callback(collection[i]))
      }

      return newCollection
    },

    reduce: function(c, callback, acc) {
      let collection = c.slice(0)

      if (!acc){
        acc = collection[0];
        collection = collection.slice(1)
      }

      for (let i = 0; i < collection.length; i++){
        acc = callback(acc, collection[i], collection)
      }
      return acc;
    },

    find: function(collection, predicate) {
      if (!(collection instanceof Array)){
        collection = Object.values(collection)
      }

      for (let i = 0; i < collection.length; i++){
        if (predicate(collection[i])) return collection[i]
      }

      return undefined;
    },

    filter: function(collection, predicate){
      if (!(collection instanceof Array)){
        collection = Object.values(collection)
      }
      const newCollection = []

      for (let i = 0; i < collection.length; i++){
        if ( predicate(collection[i])) newCollection.push(collection[i])
      }

      return newCollection;
    },

    size: function(collection){
      if (!(collection instanceof Array)){
        collection = Object.values(collection)
      }

      return collection.length
    },

    first: function(collection, n = false){
      return (n) ? collection.slice(0, n) : collection[0]
    },

    last: function(collection, n = false){
      return (n) ? collection.slice(collection.length-n, collection.length) : collection[collection.length-1]
    },

    compact: function(collection){
      const bad = new Set([false, null, 0, "", undefined, NaN])
      return collection.filter(e => !bad.has(e))
    },

    sortBy: function(array, callback){
      const newArr = [...array]
      return newArr.sort(function(a,b){
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(array, depth=false, newArr = []){
      if (!Array.isArray(array)) return newArr.push(array)
      if(depth){
        for (let e of array){
          Array.isArray(e) ? this.unpack(newArr, e) : newArr.push(e)
        }
      } else {
        for ( let e of array){
          this.flatten(e, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(array, isSorted=false, callback=false){
      if (isSorted){
        return fi.uniqSorted(array, callback)
      } else if (!callback) {
        return Array.from(new Set(array))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of array){
          const moddedVal = callback(val)
          if(!modifiedVals.has(moddedVal)){
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj){
      return Object.keys(obj)
    },

    values: function(obj){
      return Object.values(obj)
    },

    functions: function(obj){
      const funcNames = []

      for ( let key in obj){
        if (typeof obj[key] === "function") {
          funcNames.push(key)
        }
      }

      return funcNames.sort()
    }



  }
})()

fi.libraryMethod()
