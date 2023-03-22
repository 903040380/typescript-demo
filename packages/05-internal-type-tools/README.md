# 内部类型工具 Internal Type Tools

使用方式：

- 操作符
- 关键字
- 专用语法

使用目的：

- 类型创建
- 类型安全保护

## 类型别名

type 是对一组类型或一个特定类型的封装，仅仅是起别名
interface 是类型接口，声明一个新类型

类型别名还能作为工具类型，工具类同样基于类型别名，只是多了个泛型

```ts
type Factory<T> = T | number | string
```

工具类型就像一个函数一样，泛型是入参，内部逻辑基于入参进行某些操作，再返回一个新的类型
当然，我们一般不会直接使用工具类型来做类型标注，而是再度声明一个新的类型别名

```ts
type FactoryWithBool = Factory<boolean>

const foo: FactoryWithBool = true
```

## 联合类型与交叉类型

||与&&
对象类型的交叉类型，合并属性
联合类型组成的交叉类型，取交集

```ts
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2) // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string // string
```

## 索引类型

- 索引签名类型：`[key: string]: string`在接口或类型别名中，快速声明一个键值类型一致的类型结构
- 索引类型查询：`keyof`将对象中的所有键转换为对应字面量类型，然后再组合成联合类型，注意并不会将数字类型的键名转换为字符串类型字面量，而是仍然保持为数字类型字面量
- 索引类型访问：通过键的字面量类型（'propA'）访问这个键对应的键值类型（number）

keyof 操作符(索引类型查询)能一次性获取这个对象所有的键的字面量类型，也能用在索引类型访问：

```ts
interface Foo {
  propA: number
  propB: boolean
  propC: string
}

type PropTypeUnion = Foo[keyof Foo] // string | number | boolean
```

## 映射类型

`in`基于键名映射到键值类型

```ts
type Clone<T> = {
  [K in keyof T]: T[K]
}
```

`K in` 属于映射类型的语法，`keyof T` 属于 `keyof` 操作符(索引类型查询)，[`K in keyof T]`的`[]`属于索引签名类型，`T[K]`属于索引类型访问
