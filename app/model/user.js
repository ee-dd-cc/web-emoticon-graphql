'use strict';

module.exports = app => {
  // 引入建立连接的mongoose
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 数据库表的映射
  const UserSchema = new Schema({
    username: { type: String },
    status: {
      type: Number,
      default: 1,
    },
  });
  return mongoose.model('Gyk', UserSchema, 'gyk');
};
