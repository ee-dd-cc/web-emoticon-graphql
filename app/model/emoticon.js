'use strict';

module.exports = app => {
  // 引入建立连接的mongoose
  const mongoose = app.mongoose;
  // const mongoConfig = app.config.mongoConfig;
  const Schema = mongoose.Schema;
  // 数据库表的映射
  const UserSchema = new Schema({
    // username: { type: String },
    // sex: { type: String }
  });
  return mongoose.model('emoticon_list', UserSchema, 'emoticon_list');
  // return mongoose.model('hot_list_deal', UserSchema, 'hot_list_deal');
};
