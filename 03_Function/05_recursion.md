# 재귀와 메모이제이션, Recursion & Memoization 

## 재귀, Recursion

재귀는 자기 자신을 호출하는 것을 의미합니다.

```javascript
var factorial = function(number){
    var result = 1;
    for (var i=1; i<=number; i++){
        result *= i;
    }
    return result;
}
factorial(5);
```

위의 코드는 팩토리얼을 계산하는 함수입니다. 위의 함수를 재귀로 만들어보죠.

```javascript
var factorial = function(number){
    if(number > 0){
        return number * factorial(number-1);
    }else{
        return 1;
    }
}
factorial(5);
```

**위와 같이 같은 문제에 대해서 재귀적으로 푸는 방식을 `분할 정복 알고리즘`이라고 합니다.** 



## 메모이제이션, Memoization

메모이제이션은 재귀로 문제를 풀 때, 자주 사용되는 코딩기법입니다. 위에서 사용한 재귀함수는 이미 계산한 내용을 또 다시 계산하기 때문에 필요없는 연산이 생깁니다. **메모이제이션은 반복되는 결과를 메모리에 저장한 뒤에 같은 결과가 나왔을 때 빨리 실행하는 방식입니다.** 예를들어 `factorial(5)`를 입력할 경우,

```javascript
5*factorial(4)
5*(4*factorial(3))
5*(4*(3*factorial(2)))
5*(4*(3*(2*factorial(1)))
5*(4*(3*(2*1*factorial(0))))
5*(4*(3*(2*1*1)))
```

이런식으로 재귀계산이 진행됩니다. 재귀함수를 불러올 때마다 했던 계산도 또 해야하므로 number가 커지면 비효율적인 방법이 되죠. (시간복잡도 = O(N^2))

메모이제이션은 수행했던 계산을 메모리에 저장해둡니다. (시간복잡도 = O(N)) **메모이제이션은 메모리 자원을 많이 사용하는 대신 복잡도를 줄이는 대표적인 알고리즘입니다.**

```javascript
let memo= [1];
function factorial(number){
    if(typeof memo[number] !== 'number'){
        memo[number] = number*factorial(number-1);
    }
    return memo[number];
}

factorial(5);
```

위 코드의 실행과정은 다음과 같습니다.

```javascript
memo[5] = 5 * factorial(4) = 5*4*3*2*1		factorial(5)
memo[4] = 4 * factorial(3) = 4*3*2*1		factorial(4)
memo[3] = 3 * factorial(2) = 3*2*1			factorial(3)
memo[2] = 2 * factorial(1) = 2*1 			factorial(2)
memo[1] = 1 * factorial(0) = 1   			factorial(1)
memo[0] = 1;
```

*(심화)*

```javascript
var factorial = (function(){
    var save = {};
    var fact = function(number){
        if(number>0){
            var saved = save[number-1]||fact(number-1);	//saved = save[number-1] or saved = fact(number-1) (재귀)
            var result = number*saved;
            save[number] = result;
            return result;
        }else{
            return 1;
        }
    };
    return fact;
})();

console.log(factorial(5));
```



