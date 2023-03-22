let name: any = 'linbudu'

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error('Not a number!')
  }
}

assertIsNumber(name)

// number 类型！
name.toFixed()

export {}
