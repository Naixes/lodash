// 创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。 iteratee（迭代函数）调用3个参数：(value, index|key, collection)
function map(collection, iteratee) {
  let index = -1
  const length = collection == null ? 0 : collection.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(collection[index], index, collection)
  }
  return result
}

function square(n) {
  return n * n
}

console.log(map([4, 8], square))
