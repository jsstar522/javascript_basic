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
