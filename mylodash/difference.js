console.log('==================isLength================')

const MAX_SAFE_INTEGER = 9007199254740991

// 检查 value 是否为有效的类数组长度。
function isLength(value) {
  // number类型小于最大安全整数非负整数
  return typeof value === 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

console.log('==================isArrayLike================')

// import isLength from '../isLength.js'

// 检验是否类数组
function isArrayLike(value) {
  // 非空，不是方法，长度为有效长度
  return value != null && typeof value !== 'function' && isLength(value.length)
}

console.log('==================isObjectLike================')

// 检查 value 是否是 类对象。 如果一个值是类对象，那么它不应该是 null，而且 typeof 后的结果是 "object"。
function isObjectLike(value) {
  return typeof value === 'object' && value !== null
}

console.log('==================isArrayLikeObject================')

// import isArrayLike from '../isArrayLike.js'
// import isObjectLike from '../isObjectLike.js'

// 这个方法类似 _.isArrayLike。除了它还检查value是否是个对象。
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value)
}

console.log('==================baseDifference================')

import SetCache from '../.internal/SetCache.js'
import arrayIncludes from '../.internal/arrayIncludes.js'
import arrayIncludesWith from '../.internal/arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from '../.internal/cacheHas.js'

const LARGE_ARRAY_SIZE = 200

function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    // 每一个value的值
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

console.log('==================baseFlatten================')

import isFlattenable from '../.internal/isFlattenable.js'

// 减少嵌套，从最外部开始
// 原数组，要减少的嵌套层数，每次调用的函数，是否过滤不可展开或层数不大于时0的值，初始化返回值
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable)
  result || (result = [])

  if (array == null) {
    return result
  }

  for (const value of array) {
    // 层数大于0并且可展开
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        result.push(...value)
        console.log('result', result)
      }
    // 是否过滤不可展开或层数不大于时0的值
    } else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}

// console.log('[1, [2, [3, [4]], 5]]', baseFlatten([1, [2, [3, [4]], 5]], 1, null, false))
console.log('[[1], [2, [3, [4]], 5]]', baseFlatten([[1], [2, [3, [4]], 5]], 1, null, true))
// console.log('[1, [2, [3, [4]]]]', baseFlatten([3, 4], -1, null, true)) // []
// console.log('[3, 4]', baseFlatten([3, 4], -1, null, true)) // []
// console.log('[3, 4]', baseFlatten([3, 4], -1, null, false)) // [3, 4]
// console.log('3', baseFlatten(3, -1, null, true)) // 报错

console.log('==================difference================')

// import baseFlatten from '../.internal/baseFlatten.js'
// import baseDifference from '../.internal/baseDifference.js'
// import isArrayLikeObject from '../isArrayLikeObject.js'

function difference(array, ...values) {
  // 这里的values会在...values外加一层[]
  console.log('values', values)
  // 判断是否类数组和类对象,不是时返回[]
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : []
}

console.log('difference([3, 2, 1], [4, 2])', difference([3, 2, 1], [4, 2]))
// console.log('difference([1], [2])', difference([1], [2]))
