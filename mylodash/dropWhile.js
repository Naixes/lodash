console.log('==================baseWhile================')

import slice from '../slice.js'

// isDrop:是否去除
function baseWhile(array, predicate, isDrop, fromRight) {
  const { length } = array
  let index = fromRight ? length : -1

  console.log('index', index)

  // 遇到第一个false就停止,记录第一个false的位置
  while ((fromRight ? index-- : ++index < length) &&
    predicate(array[index], index, array)) {}

  console.log('index', index)

  // 裁切/保留符合条件的
  return isDrop
    ? slice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
    : slice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index))
}

console.log('==================dropWhile================')

// import baseWhile from '../.internal/baseWhile.js'

// 创建一个切片数组，去除array中从起点开始到 predicate 返回假值结束部分。
function dropWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true)
    : []
}

const users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': true },
  { 'user': 'pebbles', 'active': false }
]

console.log(dropWhile(users, ({ active }) => active))
// => objects for ['pebbles']

console.log('==================dropRightWhile================')

// import baseWhile from '../.internal/baseWhile.js'

function dropRightWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true, true)
    : []
}

console.log(dropRightWhile(users, ({ active }) => active))
// => objects for ['pebbles']
