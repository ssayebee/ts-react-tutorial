# ts-react-tutorial

리액트에서 타입스크립트를 사용하는 방법에 대한 기록
### 1.1 기본 타입

```typescript

const message: string = 'hello world';
const done: boolean = false;

const numbers: number[] = [1, 2, 3];
const messages: string[] = ['hello', 'world'];

let mightBeUndefined: string | undefined = undefined;
let nullableNumber: number | null = null;

let color: 'red' | 'orange' | 'yellow' = 'red'

```

### 1.2 함수

```typescript

function sum(x: number, y: number): number {
  return x + y;
}

function sumArray(numbers: number[]): number {
  return numbers.reduce((acc, current) => acc + current, 0);
}

function returnNothing(): void {
  console.log('something here');
}

function stringOrNumber(): string | number {
  return 4;
}

```

---

## 2. Interface, Type Alias

### 2.1 Interface 기본

```typescript

interface Shape {
  getArea(): number;
}

class Circle implements Shape {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  getArea() {
    return this.radius * this.radius * Math.PI;
  }
}

class Rectangle implements Shape {
  widht: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
const rectangle = new Rectangle(2, 5);
const shapes: Shape[] = [circle, rectangle];

shapes.forEach(shape => {
  console.log(shape.getArea());
});


```

### 2.2 접근 제한자(public, private)

```typescript

class Circle implements Shape {
  constructor(private radius: number) {}
  // 접근 지정자 public, private을 사용하면 코드를 줄일 수 있다.
}

### 2.3 Interface 심화

// ?가 있는 경우 선택적 값 생성자
interface Person {
  name: string;
  age?: number;
};

interface Developer {
  name: string;
  age?: number;
  skills: string[];
};

// Person 과 Developer의 코드 중복 개선
interface Developer extends Person {
  skills: string[];
};

const person: Person = {
  name: '김사람',
  age: 20,
};

const expert: Person = {
  name: '김계발',
  age: 20,
  skills: ['javascript', 'react', 'typescript'] 
};

```


### 2.4 Type Alias

```typescript

type Person = {
  name: string;
  age?: number;
};

type Developer = Person & {
  skills: string[];
};

// type alias의 추가 기능
type People = Person[];
const people: People = [person, expert];

type Color = 'red' | 'orange' | 'yellow';
const color: Color = 'orange';

```

- type 키워드를 사용하면 인터페이스와 유사하게 동작하지만, 몇 가지 기능을 더 사용할 수 있다.
- 개체에 대한 type을 지정할 때, type alias와 interface중 무엇을 사용하던지 상관없지만, 일관성 있게 사용해야 한다.

---

## 3. Generics

### 3.1 예제 1) 객체 하나로 합치기

```typescript

function merge<T1, T2>(a: T1, b: T2) {
  return {
    ...a,
    ...b
  };
}

const merged = merge({ foo: 1 }, { bar: 2 });

```

any 키워드를 사용할 수도 있지만, 제네릭을 사용하면 실제 파라미터의 값이 유추가 가능하다.(자동 완성)

### 3.2 예제 2) wrapping


```typescript

function wrap<T>(param: T) {
  return {
    param
  };
};
const wrapped = wrap('aaa');
console.log(wrapped.param); 

```

### 3.3 Interface에서 제네릭 사용하기

```typescript

interface Items<T> {
  list: T[];
};

// type alias
type Items<T> = {
  list: T[]
};

const items: Items<string> = {
  list: [1, 2, 3]
};

```

### 3.4 Class에서 제네릭 사용하기

```typescript

class Queue<T> {
  list: T[] = {};

  get length() {
    return this.list.length;
  }

  enqueue(item: T) {
    this.list.push(item);
  }

  dequeue() {
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

while (queue.length > 0) {
  console.log(queue.dequeue());
}

```


### 4.1 리액트 & 리덕스

```typescript

import React from 'react';

type GreetingsProps = {
  name: string;
  mark?: string;
  onClick: (name: string) => void
}

const Greetings: React.FC<GreetingsProps> = ({ name, mark = '!', onClick }) => {
  const handleClick = () => onClick(name);
  return <div>
      Hello, {name} {mark}
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
}

export default Greetings;

```

위와 같이 화살표 함수를 사용한 경우에는 Default Props를 사용할 수 없다. 따라서 비구조화 할당 이후 기본값을 지정해 주는 형태로 Default Props를 이용한다.

```typescript

import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
}

function Greetings({ name, mark = '!' }: GreetingsProps) {
  return <div>Hello {name} {mark}</div>
}

Greetings.defaultProps = {
  mark: '!'
}

export default Greetings;

```

아래의 경우는 function 키워드를 사용하여 Default Props를 지정해준 예시이다.

### 4.2 리액트에서 상태 관리하기 (useState)

```typescript

import React, { useState } from 'react';

function Counter() {
  // 제너릭 생략 가능
  const [count, setCount] = useState<number>(0);
  const [count, setCount] = useState(0);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  return <div>
    <h1>{count}</h1>
    <button onClick={onIncrease}>+1</button>
    <button onClick={onDecrease}>-1</button>
  </div>
}

export default Counter;

```

### 4.3 리액트 폼 관리

```typescript

import React, { useState } from 'react';

type MyFormProps = {
  onSubmit: (form: {name: string, description: string}) => void
}

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: '',
    description: ''
  })

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: ''
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange}/>
      <input name="description" value={description} onChange={onChange}/>
      <button type="submit">
        등록
      </button>
    </form>
  )
}

export default MyForm;

```

### 4.4 useReducer를 이용한 Counter 컴포넌트

```typescript

import React, { useReducer } from 'react';

type Action = { type: 'INCREASE'} | { type: 'DECREASE'};

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error('Unhandled action type')
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });

  return <div>
    <h1>{count}</h1>
    <button onClick={onIncrease}>+1</button>
    <button onClick={onDecrease}>-1</button>
  </div>
}

export default Counter;

```

### 4.5 useReducer 심화

```typescript

import React, { useReducer } from 'react';

type Color = 'red' | 'orange' | 'yellow';

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
}

type Action =
  | { type: 'SET_COUNT', count: number }
  | { type: 'SET_TEXT', text: string }
  | { type: 'SET_COLOR', color: Color }
  | { type: 'TOGGLE_GOOD' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count
      }
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      }
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color
      }
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood
      }
    default:
      throw new Error('Unhandled Action Type')
  }
}

function ReducerSample() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: 'hello',
    color: 'red',
    isGood: true
  });

  const setCount = () => dispatch({ type: 'SET_COUNT', count: 5 });
  const setText = () => dispatch({ type: 'SET_TEXT', text: 'bye' });
  const setColor = () => dispatch({ type: 'SET_COLOR', color: 'orange' });
  const toggleGood = () => dispatch({ type: 'TOGGLE_GOOD' });

  return (
    <div>
      <p><code>count: </code>{state.count}</p>
      <p><code>text: </code>{state.text}</p>
      <p><code>color: </code>{state.color}</p>
      <p><code>good: </code>{state.isGood?'true':'false'}</p>
      <div>
        <button onClick={setCount}>count</button>
        <button onClick={setText}>text</button>
        <button onClick={setColor}>color</button>
        <button onClick={toggleGood}>good</button>
      </div>
    </div>
  )
}

export default ReducerSample;

```
