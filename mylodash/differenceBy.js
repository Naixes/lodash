// import baseDifference from '../.internal/baseDifference.js'
import baseFlatten from '../.internal/baseFlatten.js'
import isArrayLikeObject from '../isArrayLikeObject.js'
import last from '../last.js'

console.log('==================baseDifference================')

import SetCache from '../.internal/SetCache.js'
import arrayIncludes from '../.internal/arrayIncludes.js'
import arrayIncludesWith from '../.internal/arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from '../.internal/cacheHas.js'

const LARGE_ARRAY_SIZE = 200

function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  // 标志是否是普通操作
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  // iteratee:迭代器函数(会对每个value进行的操作)
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  // comparator:比较器(会对每个value进行的操作)
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  }
  // 长数组优化
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    // computed:对每一个value进行处理后的结果,避免修改value
    const computed = iteratee == null ? value : iteratee(value)
    console.log('computed', computed)

    value = (comparator || value !== 0) ? value : 0
    // computed === computed：保证取出来的数据不是NaN
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        console.log('values[valuesIndex]', values[valuesIndex])
        // 相等时跳出while进入outer
        if (values[valuesIndex] === computed) {
          continue outer
        }
      }
      // 不相同时加入result
      result.push(value)
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}

console.log('==================differenceBy================')

function differenceBy(array, ...values) {
  // 获取最后一个参数迭代器
  let iteratee = last(values)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), iteratee)
    : []
}

console.log(differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor))

