'use strict';
var Alexa = require("alexa-sdk");

var Quiz = require("./quiz");

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
    var quiz = Quiz.all[Math.floor(Math.random() * Quiz.all.length)];

    var msg = quiz.question + " 正解は「" + quiz.answer + "」です。";

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
