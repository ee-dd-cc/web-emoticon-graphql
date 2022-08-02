/*
 * @Author: EdisonGu
 * @Date: 2022-06-07 12:11:05
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-02 10:13:36
 * @Descripttion: 第三方插件
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
