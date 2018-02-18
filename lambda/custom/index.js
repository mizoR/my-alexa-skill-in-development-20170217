'use strict';
var Alexa = require("alexa-sdk");

var APP_ID = process.env.APP_ID;

exports.handler = function(event, context) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit('Quiz');
  },
  'Quiz': function () {
    var msg = '「遅い」という状況に対して上田がよく使う、季節の料理を使った例えツッコミといえば? 正解は「11月に冷やし中華はじめましたか！」です。';
    this.emit(':tell', msg);
  },
  'SessionEndedRequest' : function() {
    console.log('Session ended with reason: ' + this.event.request.reason);
  },
  'AMAZON.StopIntent' : function() {
    this.emit(':tell', 'このスキル、今日までー。');
  },
  'AMAZON.HelpIntent' : function() {
    this.emit(':tell', 'くりぃむしちゅーの上田晋也に関するクイズを出題します。');
  },
  'AMAZON.CancelIntent' : function() {
    this.emit(':tell', 'まぁ、でも、楽しかった、よね。');
  },
  'Unhandled' : function() {
    this.emit(':tell', 'ごめんなさい、今そういうの募集していないんですよ。');
  }
};
