// function chunk(arr, size = 1) {
//     let res = []
//     let tem = []
//     for(let i = 0; i < arr.length; i+=size) {
//         tem = arr.slice(i, i + size)
//         console.log('tem', tem)
//         res.push(tem)
//     }
//     return res
// }

import slice from '../slice.js'
import toInteger from '../toInteger.js'

function chunk(array, size = 1) {
    size = Math.max(toInteger(size), 0)
    console.log(size)
    const length = array == null ? 0 : array.length
    if (!length || size < 1) {
      return []
    }
    let index = 0
    let resIndex = 0
    const result = new Array(Math.ceil(length / size))
  
    while (index < length) {
      result[resIndex++] = slice(array, index, (index += size))
    }
    return result
}

// export default chunk
console.log(chunk([1,2,3,4,5,6,7], 2))