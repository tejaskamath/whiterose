
let splitUrl = function (str) {
  let split = str.split('/')
  let col = split[0]
  let data = JSON.parse((localStorage.getItem(col) || '[]'))
  console.log(data)
  return {split, col, data}
}

let uniqueID = function (n=12){
  function randStr(){
    return Math.random().toString(16).slice(-4);
  }
  return (new Array(n).fill(1).map(() => randStr()).join(''))
}

let find = function (url) {
  // eslint-disable-next-line no-unused-vars
  let {split, col, data} = splitUrl(url)
  if (url.includes('/')) {
    // Specific item 
    let id = split[1]
    return data.find(d => d.id === id)
  }
  return data
}

let add = function (url, obj) {
  // eslint-disable-next-line no-unused-vars
  let {split, col, data} = splitUrl(url)
  let newObj = {...obj, id: uniqueID()}
  data.push(newObj)
  localStorage.setItem(col, JSON.stringify(data))
  return data
}

let del = function (url) {
  // eslint-disable-next-line no-unused-vars
  let {split, col, data} = splitUrl(url)
  if (url.includes('/')) {
    // Specific item 
    let id = split[1]
    data = data.filter(d => d.id !== id)
  } else {
    data = []
  }
  localStorage.setItem(col, JSON.stringify(data))
  return data
}

exports.get = find
exports.find = find
exports.post = add
exports.add = add
exports.delete = del
exports.remove = del