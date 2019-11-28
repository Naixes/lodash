
console.log('==================slice================')

function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  // 处理start和end
  start = start == null ? 0 : start
  // 没有end时end就是数组长度
  end = end === undefined ? length : end

  // 重置start和end
  // 负数
  if (start < 0) {
    // 取负后大于长度:0/从尾部开始计算
    start = -start > length ? 0 : (length + start)
  }
  // end大于长度时重置为长度
  end = end > length ? length : end
  // 负数:从尾部开始计算
  if (end < 0) {
    end += length
  }
  // 根据传入的 Array 的初始和结束索引求得要操作的数据元素的长度
  // 在 JS 中，Array.length 是一个 32 位无符号整型数字，而通过无符号位移运算 >>> 0，就是为了确保我们得到的正确的 length 值，它总是能得到一个 32-bit unsigned ints
  // 移位操作符在移位前做了两种转换，第一将不是number类型的数据转换为number，第二将number转换为无符号的32bit数据，也就是Uint32类型。这些与移位的位数无关，移位0位主要就是用了js的内部特性做了前两种转换。
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

console.log('==================drop================')

// import slice from '../slice.js'
import toInteger from '../toInteger.js'

// 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
function drop(array, n=1) {
  const length = array == null ? 0 : array.length
  // n小于0时重置为0
  //   截取n~length
  return length
    ? slice(array, n < 0 ? 0 : toInteger(n), length)
    : []
}

console.log(drop([1, 2, 3], 2))
// => [3]

console.log('==================dropRight================')

function dropRight(array, n=1) {
  const length = array == null ? 0 : array.length
  // 获取最后的索引
  n = length - toInteger(n)
  // 截取0~n
  return length ? slice(array, 0, n < 0 ? 0 : n) : []
}

console.log(dropRight([1, 2, 3], 2))
