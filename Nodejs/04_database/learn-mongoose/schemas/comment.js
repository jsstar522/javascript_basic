const mongoose = require('mongoose');

//ES6비구조화 할당, const Schema = mongoose.Schema;
const { Schema } = mongoose;
//ES6비구조화 할당, const ObjectId = Schema.Types.ObjectId;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  commenter: {
    //자료형은 ObjectId, 참조는 User
    type: ObjectId,
    required: true,
    ref: 'User',
    //User의 스키마가 ObjectId로 참조됨
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);