console.log('==================baseFindIndex================')

function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)
  console.log('index', index)

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}

console.log('==================findLastIndex================')

// import baseFindIndex from '../.internal/baseFindIndex.js'
import toInteger from '../toInteger.js'

// 从右到左的迭代集合array中的元素,找到符合条件元素的索引
function findLastIndex(array, predicate, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = length - 1
  // 处理fromIndex
  if (fromIndex !== undefined) {
    // 转为整数
    index = toInteger(fromIndex)
    // 处理formIndex是否在合理范围内
    index = fromIndex < 0
      ? Math.max(length + index, 0)
      : Math.min(index, length - 1)
  }
  console.log('index', index)
  return baseFindIndex(array, predicate, index, true)
}

const users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
]

console.log(findLastIndex(users, ({ user }) => user == 'pebbles'))
// => 2
