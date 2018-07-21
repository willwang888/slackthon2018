// /**
//  * A Bot for Slack!
//  */
//
//
// /**
//  * Define a function for initiating a conversation on installation
//  * With custom integrations, we don't have a way to find out who installed us, so we can't message them :(
//  */
//
// function onInstallation(bot, installer) {
//     if (installer) {
//         bot.startPrivateConversation({user: installer}, function (err, convo) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 convo.say('I am a bot that has just joined your team');
//                 convo.say('You must now /invite me to a channel so that I can be of use!');
//             }
//         });
//     }
// }
//
//
// /**
//  * Configure the persistence options
//  */
//
// var config = {};
// if (process.env.MONGOLAB_URI) {
//     var BotkitStorage = require('botkit-storage-mongo');
//     config = {
//         storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
//     };
// } else {
//     config = {
//         json_file_store: ((process.env.TOKEN)?'./db_slack_bot_ci/':'./db_slack_bot_a/'), //use a different name if an app or CI
//     };
// }
//
// /**
//  * Are being run as an app or a custom integration? The initialization will differ, depending
//  */
//
// if (process.env.TOKEN || process.env.SLACK_TOKEN) {
//     //Treat this as a custom integration
//     var customIntegration = require('./lib/custom_integrations');
//     var token = (process.env.TOKEN) ? process.env.TOKEN : process.env.SLACK_TOKEN;
//     var controller = customIntegration.configure(token, config, onInstallation);
// } else if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.PORT) {
//     //Treat this as an app
//     var app = require('./lib/apps');
//     var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, config, onInstallation);
// } else {
//     console.log('Error: If this is a custom integration, please specify TOKEN in the environment. If this is an app, please specify CLIENTID, CLIENTSECRET, and PORT in the environment');
//     process.exit(1);
// }
//
//
// /**
//  * A demonstration for how to handle websocket events. In this case, just log when we have and have not
//  * been disconnected from the websocket. In the future, it would be super awesome to be able to specify
//  * a reconnect policy, and do reconnections automatically. In the meantime, we aren't going to attempt reconnects,
//  * WHICH IS A B0RKED WAY TO HANDLE BEING DISCONNECTED. So we need to fix this.
//  *
//  * TODO: fixed b0rked reconnect behavior
//  */
// // Handle events related to the websocket connection to Slack
// controller.on('rtm_open', function (bot) {
//     console.log('** The RTM api just connected!');
// });
//
// controller.on('rtm_close', function (bot) {
//     console.log('** The RTM api just closed');
//     // you may want to attempt to re-open
// });
//
//
// /**
//  * Core bot logic goes here!
//  */
// // BEGIN EDITING HERE!
//
// controller.on('bot_channel_join', function (bot, message) {
//     bot.reply(message, "I'm here!")
// });
//
// controller.hears('hello', 'direct_message', function (bot, message) {
//     bot.reply(message, 'Hello!');
// });
//
//
// /**
//  * AN example of what could be:
//  * Any un-handled direct mention gets a reaction and a pat response!
//  */
// //controller.on('direct_message,mention,direct_mention', function (bot, message) {
// //    bot.api.reactions.add({
// //        timestamp: message.ts,
// //        channel: message.channel,
// //        name: 'robot_face',
// //    }, function (err) {
// //        if (err) {
// //            console.log(err)
// //        }
// //        bot.reply(message, 'I heard you loud and clear boss.');
// //    });
// //});


var express = require('express');
var app = express();
var url = require('url');
var request = require('request');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 80));

app.post('/', function(req, res){
  console.log("hello");
  console.log(req.body);
  console.log(req.body.payload);

  console.log(typeof(req.body.payload));

  let obj = JSON.parse(req.body.payload);
  console.log(obj.callback_id);
  res.send('It works!');
});

// app.post('/post', function(req, res){
//   var parsed_url = url.format({
//     pathname: 'https://api.genius.com/search',
//     query: {
//       access_token: process.env.GENIUS_ACCESS,
//       q: req.body.text
//     }
//   });
//
//   request(parsed_url, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var data = JSON.parse(body);
//       var first_url = data.response.hits[0].result.url;
//
//       var body = {
//         response_type: "in_channel",
//         text: first_url
//       };
//
//       res.send(body);
//     }
//   });
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// var server = app.listen(3000, function () {
//     console.log("app running on port.", server.address().port);
// });
