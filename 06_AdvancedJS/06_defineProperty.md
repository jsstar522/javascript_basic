# 변수 변경 탐지

변수가 변경되면 특정 동작을 실행하는 방법에 `Object.observer`라는 메서드를 사용했지만 이제는 사라졌습니다. ES6 기준으로 `Object.defineProperty`를 사용할 수 있습니다. 버튼을 누르면 화면의 숫자가 하나씩 올라가거나 내려가는 코드를 작성해보겠습니다.

```html
<!-- defineProperty.html -->
<!DOCTYPE html>
<html>
    <div id = 'count'>0</div>
    <button id ='up'>+1</button>
    <button id ='down'>-1</button>
    <script>
        var count = 0;
        var counter = document.querySelector('#count');
        document.querySelector('#up').addEventListener('click', function(){
            count++;
            counter.textContent = count;
        });
                document.querySelector('#down').addEventListener('click', function(){
            count--;
            counter.textContent = count;
        });
    </script>
</html>
```

변수가 변경되는 것을 탐지하고 화면에 표시하는 코드입니다. `+`하는 부분과 `-`하는 부분이 중복됩니다. 이 중복을 다음과 같이 바꿀 수 있습니다.

```html
<!-- defineProperty.html -->
<!DOCTYPE html>
<html>
    <div id = 'count'>0</div>
    <button id ='up'>+1</button>
    <button id ='down'>-1</button>
    <script>
        var count = {};
        Object.defineProperty(count, 'number', {
            get: function(){
                return this._num || 0;
            },
            set: function(num){
                this._num = num;
                console.log(this._num);
                document.querySelector('#count').textContent = this._num;
            },
        });
        document.querySelector('#up').addEventListener('click', function(){
            count.number++;
        });
        document.querySelector('#down').addEventListener('click', function(){
            count.number--;
        });
    </script>
</html>
```

이제 ES6에서는 다음과 같이 코드를 줄일 수도 있습니다.

```html
<!-- defineProperty.html -->
<!DOCTYPE html>
<html>
    <div id = 'count'>0</div>
    <button id ='up'>+1</button>
    <button id ='down'>-1</button>
    <script>
        const count = {
            get number(){
                return this._num || 0;
            },
            set number(num){
                this._num = num;
                console.log(num);
                document.querySelector('#count').textContent = this._num;
            }
        };
        document.querySelector('#up').addEventListener('click', function(){
            count.number++;
        });
        document.querySelector('#down').addEventListener('click', function(){
            count.number--;
        });
    </script>
</html>
```

더 다양하게 변수 변경 탐지를 활용하고 싶다면 ES6의 `Proxy` 객체를 사용하면 됩니다.