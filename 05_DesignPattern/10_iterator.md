# 반복자 패턴, Iterator Pattern

**순서가 있는 배열 등을 편하게 탐색할 수 있는 방식입니다.** 

벌집에서 꿀을 빼내는 작업을 생각해보도록 하겠습니다. 벌집에 꿀을 빼내면 표시를 하면 되지만 거추장스러운 장비 때문에 쉽지가 않다고 가정하겠습니다. **벌집에서 꿀을 빼내고 '다음'이라고 말하면 다음 벌집을 다른사람이 넘겨주면 쉬울 것 같습니다. 이제 다음 벌집을 넘겨주는 사람을 만드는겁니다.**

```javascript
var Bulk = (function(){
    function Bulk(bulkList){
        this.bulkList = bulkList;
        this.index = 0;
    }
    Bulk.prototype.next = function(){
        console.log(this.bulkList[this.index++] + '에서 꿀을 빼냅니다');
    };
    Bulk.prototype.done = function(){
        return this.bulkList.length === this.index;
    };
    return Bulk;
})();
```

벌집 리스트가 주어지면 index를 늘려가면서 작업하고, 작업이 끝났는지 물어볼 수 있습니다.

```javascript
bulk = new Bulk(['1','2','3','4','5','6','7','8','9','10']);

bulk.next();
bulk.next();
bulk.done();
bulk.next();
bulk.next();
bulk.next();
bulk.next();
bulk.done();
bulk.next();
bulk.next();
bulk.next();
bulk.next();
```

`next 함수`를 실행할 때마다 몇번째 벌집의 꿀을 빼내고 있는지 알 수 있고 `done 함수`를 실행할 때마다 작업이 완료됐는지 확인할 수 있습니다.