// 创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
function _compact(arr) {
  if (arr === null) {return []}
  return arr.filter((ele) => ele)
}

console.log(_compact([0, 1, false, 2, '', 3]))

function compact(array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}
console.log(compact([0, 1, false, 2, '', 3]))
