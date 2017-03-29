##### Implement support for Wolfram Alpha.

Now you will add a new case for the intent “wolfram” in your code. But this time you will input the question to Wolfram Alpha after you get a reply from Watson. So add a variable above the input function that will know if your current input should be sent to Watson or Wolfram. For instance:

```javascript
let wolframQuestion = false;
```

Add your case for Watson in your handleIntent-function:

```javascript
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
```

Now you can add code in your input-function, that will either send your input to Wolfram Alpha or Watson, depending on the variable “wolframQuestion” is equal to true or not.

```javascript
reader.on('line', function readInput(line) {
    if (wolframQuestion) {
        wolfram.getResponse(line, respond);
        wolframQuestion = false;
    } else {
        message(line);
    }

});
```

Finish! Please try your bot again with the command `node bot.js`.
