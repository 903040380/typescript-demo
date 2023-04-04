# 条件类型与 infer Conditional Types

## 条件类型基础

`TypeA extends TypeB ? Result1 : Result2`

进行类型比较：

```ts
type Func = (...args: any[]) => any

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!'

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>
```

其中两个 extends 分别是泛型约束和条件类型

- 泛型约束要求你传入符合结构的类型参数，相当于参数校验
- 条件类型使用类型参数进行条件判断（就像 if else），相当于实际内部逻辑

## infer 关键字

TypeScript 中支持通过 infer 关键字来在条件类型中提取类型的某一部分信息

infer 只能在条件类型中使用

```ts
type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never
```

当传入的类型参数满足 T extends (...args: any[] ) => infer R 这样一个结构（不用管 infer R，当它是 any 就行），返回 infer R 位置的值，即 R，否则，返回 never

### rest 操作符 `...`

```ts
// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...any[],
  infer End
]
  ? [Start, End]
  : T

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer Start,
  ...infer Left,
  infer End
]
  ? [End, ...Left, Start]
  : T

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer Start1,
  infer Start2,
  ...infer Left
]
  ? [Start2, Start1, ...Left]
  : T
```

### 结构转换

```ts
type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never

type ArrayItemTypeResult1 = ArrayItemType<[]> // never
type ArrayItemTypeResult2 = ArrayItemType<string[]> // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]> // string | number
```

## 分布式条件类型

也称条件类型的分布式特性

是否通过泛型参数传入

首先，你的类型参数需要是一个联合类型 。其次，类型参数需要通过泛型参数的方式传入，而不能直接进行条件类型判断（如 Res2 中）。最后，条件类型中的泛型参数不能被包裹

条件类型分布式特性会产生的效果也很明显了，即将这个联合类型拆开来，每个分支分别进行一次条件类型判断，再将最后的结果合并起来

```ts
type Naked<T> = T extends boolean ? 'Y' : 'N'
type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N'

// "N" | "Y"
type Res3 = Naked<number | boolean>

// "N"
type Res4 = Wrapped<number | boolean>
```
