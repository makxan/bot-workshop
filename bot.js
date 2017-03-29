'use strict';

const watson = require('watson-developer-cloud');
const readline = require('readline');
const WeatherAPI = require('bot-workshop-weather-api');
const WolframAPI = require('bot-workshop-wolfram-alpha-api');

/******************************************************************************
 * Configure the Watson Conversation Services
 ******************************************************************************/
const username = ''; // Add the username found in your credentials.
const password = ''; // Add the password found in your credentials.
const workspace = ''; // Add id of the workspace where your instance is running.

const conversation = watson.conversation({
    username,
    password,
    version: 'v1',
    version_date: '2016-07-11'
});

const weather = new WeatherAPI(''); // Add app-id from https://openweathermap.org/api
const wolfram = new WolframAPI(''); // Add app-id from Wolfram Alpha

let wolframQuestion = false;

/******************************************************************************
 * Listen for new commands and output responses
 ******************************************************************************/
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

reader.on('line', function readInput(line) {
    if (wolframQuestion) {
        wolfram.getResponse(line, respond);
        wolframQuestion = false;
    } else {
        message(line);
    }

});

function respond(text) {
    console.log(text)
}


/******************************************************************************
 * Conversation
 * ****************************************************************************/

let context = {};
function message(message) {
    conversation.message({
        workspace_id: workspace,
        input: {'text': message},
        context: context
    } , function(err, response) {
        context = response.context;
        handleIntent(response.intents[0], response.entities);
        respond(response.output.text.join('. ') + '.');
    });
}

function handleIntent(intentObj, entities) {
    switch(intentObj.intent) {
        case 'weather':
            if (entities[0] && entities[0]['entity'] === 'city') {
                weather.getWeatherInCity(entities[0]['value'], respond);
            } else {
                weather.getWeatherInCity('Oslo', respond);
            }
            break;
        case 'wolfram':
            wolframQuestion = true;
            break;
        case 'greeting':
            break;
        default:
            respond('Could not match the intent to any commands, please try again!')
    }
}
