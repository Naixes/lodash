// 将数组按照指定长度切分为二维数组

function _chunk(arr, size = 1) {
  const res = []
  let tem = []
  for (let i = 0; i < arr.length; i+=size) {
    tem = arr.slice(i, i + size)
    console.log('tem', tem)
    res.push(tem)
  }
  return res
}

import slice from '../slice.js'
import toInteger from '../toInteger.js'

function chunk(array, size = 1) {
  // 处理参数
  // size：可以是一组值，这里只取最大值
  // **获取数组中的最大值：Math.max.apply(null,[10, 20,30]);/var max = Math.max(...arr);**
  size = Math.max(toInteger(size), 0)
  // console.log('size', size)
  // 获取长度
  const length = array == null ? 0 : array.length
  // 数组为空或size小于1返回空数组
  if (!length || size < 1) {
    return []
  }
  // console.log('length', length)
  // 原数组索引
  let index = 0
  // 新数组索引
  let resIndex = 0
  // 初始化新数组
  const result = new Array(Math.ceil(length / size))

  // 拼接新数组
  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}

// export default chunk
// console.log(chunk([1,2,3,4,5,6,7], (1,2,3)))
