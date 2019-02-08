# Immutable.js

`Immutable.js`는 불변성 유지를 위한 데이터를 다룰때 사용하기 편합니다. **리액트는 불변성을 유지해야 state나 상위 컴포넌트에서 받은 props가 변경되었을 때, 기존의 데이터의 주소값과 비교해서 변경되었다면 리렌더링을 합니다. 값 자체를 바꿔준다면 주소값이 변경되지 않기 때문에 리렌더링이 되지 않습니다.** 그래서 여태껏 `...`나 배열의 경우에는 `concat()`, `slice`을 이용해서 어렵게 데이터를 바꿨습니다.

```javascript
let object = {
    data1: 1,
    data2: 2,
    data3: 3,
    data4: {
        data5: 5,
        data6: 6,
    }
}
```

```javascript
let newObject = {
	...object,
    data4: {
        ...object.data4,
        data6: 100,
    }
}
```

`Immutable.js`를 사용하면 웬만한 동작함수는 쉽게 정의할 수 있습니다. `Immutable.js`를 사용하기 위해서 라이브러리를 설치합니다.

```bash
$ yarn add immutable
```

이제 자바스크립트 코드에서 `Immutable`을 사용해보겠습니다. `Immutable`에서는 일반객체대신 `Map`이라는 데이터구조를 사용합니다. 그리고 배열대신 `List`를 사용합니다.

## Map

```javascript
var Map = Immutable.Map;

var mapObject = Map({
    data1: 1,
    data2: 2,
    data3: 3,
    data4: Map({
        data5: 5,
        data6: 6,
    })
})

// fromJS를 그대로 사용해도 된다.
var fromJS = Immutable.fromJS;

var jsObject = fromJS({
    data1: 1,
    data2: 2,
    data3: 3,
    data4: {
        data5: 5,
        data6: 6,
    }
})
```

**Map은 일반 객체가 아니므로 Map을 사용하고 값들을 가져오거나 출력하려면 `fromJS`를 통해 자바스크립트로 바꿔서 값을 가져올 수 있습니다.**

```javascript
mapObject.toJS();
jsObject.toJS();
```

이제 `fromJS`로 만든 객체의 값을 가져오기 위해서는 다음과 같이 가져옵니다.

```javascript
mapObject.get('data1');			// 1
jsObject.get('data1');			// 1

// 더 깊은 값 가져오기
mapObject.getIn(['data4', 'data5']);	//5
jsObject.getIn(['data4', 'data5']);		//5

console.log(Object.data1);		// 값을 불러오지 못한다.
```

**우리가 일반객체가 아닌 Immutable에서 Map을 사용하는 이유는 불변성을 유지하기 위해서입니다.** 값을 바꾸거나 추가하기 위해서는 `set` 메서드를 사용합니다. 이는 **객체 자체가 변경되는 것이 아닌 기존의 객체에서 값을 바꿔 새로운 객체를 만듭니다.**

```javascript
var newObject = mapObject.set('data1', 100);
newObject.toJS();
/*
[object Object] {
  data1: 100,
  data2: 2,
  data3: 3,
  data4: [object Object] {
    data5: 5,
    data6: 6
  }
}*/
```

`data1`의 값만 바꿔서 새로운 객체를 만들었습니다. 이렇게 불변성을 유지할 수 있습니다. **깊숙한 값을 바꿀 때는 `getIn`과 같게 `setIn`을 사용하면 됩니다. 값 여러개를 한번에 바꾸기 위해서는 `merge`을 사용합니다.**

```javascript
// 값 한번에 바꾸기
var newObject = mapObject.merge({ data1: 1000, data2: 1000})
newObject.toJS();
/*
[object Object] {
  data1: 1000,
  data2: 1000,
  data3: 3,
  data4: [object Object] {
    data5: 5,
    data6: 6
  }
}
*/

// 깊은 값 한번에 바꾸기
var newObject = mapObject.mergeIn(['data4'], {data5: 50, data6: 60})
newObject.toJS();
/*
[object Object] {
  data1: 1,
  data2: 2,
  data3: 3,
  data4: [object Object] {
    data5: 50,
    data6: 60
  }
}
*/
```

## List

우리는 불변성을 유지하면서 배열의 값을 바꾸기 위해 `concat`을 사용했습니다. **`Immutable`에서는 불변성을 유지하면서 `List`를 사용하고 기존의 배열에서 사용한 메서드(`map`, `push`, `filter`, `sort`…)을 사용할 수 있습니다.** 

```javascript
var List = Immutable.List;

var list = List([0, 1, 2, 3, 4]);
```

`Immutable`의 `List` 역시 기존의 배열과 다르기 때문에 **출력하거나 사용할 때는 `toJS`를 사용합니다.**

```javascript
list.toJS();	// [0, 1, 2, 3, 4]

console.log(list);	// 값을 불러오지 못한다.
```

배열의 요소를 불러올 때는 `get`을 사용합니다. 

```javascript
list.get(3);	// 3
```

배열 안에는 객체가 들어갈 수도 있습니다.

```javascript
var List = Immutable.List;
var Map = Immutable.Map;

var list = List([
    Map({ data: 11 }),
    Map({ data: 22 }),
])

list.getIn([1, 'data']);	// 22
```

배열 안에 있는 객체는 다음과 같이 수정합니다.

```javascript
var newList = list.setIn([1, 'data'], 33);
newList.getIn([1, 'data']);		//33
var newList = list.update(1, item => item.set('data', item.get('data')*3));
newList.getIn([1, 'data']);		// 66
```

배열 안에 있는 아이템을 추가할 때는 `push`를 사용합니다.

```javascript
var newList = list.push(
    Map({ data: 33 })
);
newList.toJS();
/*
[[object Object] {
  data: 11
}, [object Object] {
  data: 22
}, [object Object] {
  data: 33
}]
*/

// 배열 맨 앞에 추가
var newList = list.unshift(
    Map({ data: 33 })
);
```

일반 배열의 `push`와 다르게 **기존의 배열 값을 변경하지 않고 새롭게 배열을 만듭니다.** 아이템을 제거하고 싶다면 `delete`를 사용합니다. 그리고 배열의 크기도 확인할 수 있습니다.

```javascript
// 두번째 아이템을 제거
var newList = list.delete(1);
```

```javascript
// 크기확인
list.size;

// 비어있는지 확인
list.isEmpty();
```



## Immutable 적용

`Immutable`을 설치하고 Map과 List로 액션함수를 정의해보겠습니다.

```bash
$ yarn add immutable
```

액션함수를 정의한 리듀서에서 `Immutable`의 Map과 List를 불러옵니다.

```javascript
// reducer/index.js

import * as types from '../actions/ActionTypes';
import { Map, List } from 'immutable';

// 초기상태
// 배열 counters안에 속성들이 객체로 선언되어 있다. List와 Map으로 변경
const initialState = Map({
  counters: List([
    Map({
      color: 'black',
      number: 0,
    })
  ])
});

// 리듀서 함수
function counter(state = initialState, action){
  const counters = state.get('counters');

  switch(action.type) {
    // 카운터 객체 추가
    // 배열 추가이므로 immutable push 이용
    case types.CREATE:
      return state.set('counters', counters.push(Map({
        color: action.color,
        number: 0
      })));
    // 카운터 객체 삭제 (배열형태로 쌓여있는 객체이므로 slice 이용)
    // 배열 삭제이므로 immutable pop 이용
    case types.REMOVE:
      return state.set('counters', counters.pop());
    // 해당 index를 가진 카운터 객체에서 숫자 증가 
    // 숫자 증가/감소이므로 list update 이용 
    case types.INCREMENT:
      return state.set('counters', counters.update(action.index, (counter) => counter.set('number', counter.get('number') + 1)));
    case types.DECREMENT:
    return state.set('counters', counters.update(action.index, (counter) => counter.set('number', counter.get('number') - 1)));
    // 색 변경이므로 list update 이용
    case types.SET_COLOR:
    return state.set('counters', counters.update(action.index, (counter) => counter.set('color', action.color)));
    default:
      return state;
  }
};

export default counter;
```

번거롭게 배열을 slice하고 새롭게 만드는 과정없이 `Immutable`로 깔끔하게 액션함수가 정리됐습니다. 이제 `Immutable`로 값이 변경되므로 받아오는 props도 `Immutable` 형태로 바꿔줍니다.

```javascript
// containers/CounterListContainer.js
// ...

// store 내부에 있는 state 값을 props로 받아온다
const mapStateToProps = (state) => ({
  counters: state.get('counters')
});

// ...
```

이제 값을 전달받을 때, `Immutable` 형태로 전달받으므로 위해 프레젠테이셔널 컴포넌트를 수정합니다.

```javascript
// components/CounterList.js
//...
import { List } from 'immutable';
//...
const CounterList = ({ counters, onIncrement, onDecrement, onSetColor}) => {
  const counterList = counters.map(
    (counter, i) => (
      <Counter
        key={i}
        index={i}
        {...counter.toJS()}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onSetColor={onSetColor}
      />
    )
  );
//...
CounterList.propTypes = {
  counters: PropTypes.instanceOf(List),
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func
};
//...
```





