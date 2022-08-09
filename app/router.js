/*
 * @Author: EdisonGu
 * @Date: 2022-05-03 12:03:57
 * @LastEditors: EdisonGu
 * @LastEditTime: 2022-08-09 12:07:38
 * @Descripttion: 
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/emoticonList', controller.emoticon.getEmoticonList);
  router.get('/emoticonDetail', controller.emoticon.getEmoticonDetail);
  router.get('/emojiDetail', controller.emoji.getEmojiDetail);
  router.get('/hotEmoji', controller.emoji.getHotEmoji);
  router.get('/searchKeyword', controller.emoticon.searchKeyword);
  router.get('/addDemo', controller.web.addDemo);
  router.get('/eggDemo', controller.redis.eggDemo);
  router.get('/getMovieInfo', controller.movie.getMovieInfo);
  // router.get('/demo', controller.user.index);
  // router.get('/web_demo', controller.user.web_demo);
  // router.get('/add', controller.user.addUser);
};
