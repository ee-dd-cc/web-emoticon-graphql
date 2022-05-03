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
  router.get('/addDemo', controller.web.addDemo);
  // router.get('/demo', controller.user.index);
  // router.get('/web_demo', controller.user.web_demo);
  // router.get('/add', controller.user.addUser);
};
