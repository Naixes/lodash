console.log('==================toNumber================')

import isObject from '../isObject.js'
import isSymbol from '../isSymbol.js'

const NAN = 0 / 0

// 匹配首尾的空格
const reTrim = /^\s+|\s+$/g

// 匹配不标准的十六进制
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

// 匹配二进制
const reIsBinary = /^0b[01]+$/i

// 匹配八进制
const reIsOctal = /^0o[0-7]+$/i

const freeParseInt = parseInt

// 返回一个数字
function toNumber(value) {
  // 数字直接返回
  if (typeof value === 'number') {
    return value
  }
  // Symbol返回NaN
  if (isSymbol(value)) {
    return NAN
  }
  // 对象：处理value
  if (isObject(value)) {
    // 判断是否有valueOf方法，优先使用valueOf，否则返回原值
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value
    // 第二次check，如果没有valueOf或处理过后还是对象，通过${}强制转换为primitive类型，否则返回原值
    value = isObject(other) ? `${other}` : other
  }
  // 非字符串
  if (typeof value !== 'string') {
    // 为0返回0否则强制转换为数字
    return value === 0 ? value : +value
  }
  // 字符串
  // 去除首尾空格
  value = value.replace(reTrim, '')
  const isBinary = reIsBinary.test(value)
  // 二进制或八进制：parseInt解析
  // 不标准的十六进制：NaN
  // 其他：+强制转换
  console.log('reIsBadHex.test(value)', reIsBadHex.test(value))
  console.log('+value', +value)
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}

console.log('0xf', toNumber('0xf'))

console.log('==================toFinite================')

// 返回一个有线数字
// import toNumber from '../toNumber.js'

const INFINITY = 1 / 0
const MAX_INTEGER = 1.7976931348623157e+308

console.log('INFINITY', INFINITY)
console.log('MAX_INTEGER', MAX_INTEGER)

function toFinite(value) {
  // value为空不为0返回value，为0返回0
  if (!value) {
    return value === 0 ? value : 0
  }
  // 获取转换为数字后的值，非数字会返回NaN
  value = toNumber(value)
  // 等于无限时的情况
  if (value === INFINITY || value === -INFINITY) {
    // 获取正负符号
    const sign = (value < 0 ? -1 : 1)
    // 返回最大或最小值
    return sign * MAX_INTEGER
  }
  console.log('value', value)
  // NaN时返回0
  return value === value ? value : 0
}

console.log('toFinite(Infinity)', toFinite(Infinity))
console.log("toFinite('哈哈')", toFinite('哈哈'))
console.log("toFinite('233')", toFinite('223'))

console.log('==================toInteger================')

// 返回一个整数
// import toFinite from '../toFinite.js'

function toInteger(value) {
  // 转换为有限数
  const result = toFinite(value)
  console.log('result', result)
  //   取小数位
  const remainder = result % 1
  console.log('remainder', remainder)
  console.log('result - remainder', result - remainder)

  //   减去小数位
  return remainder ? result - remainder : result
}

console.log(toInteger(13.66))
console.log(toInteger(-15.52))


