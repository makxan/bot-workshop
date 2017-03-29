##### Add code for handling intents.

Go to the function `handleIntent(intentObj, entities)`.

Add the following code to handle the two events `greeting` and `weather`:

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
        case 'greeting':
            break;
        default:
            respond('Could not match the intent to any commands, please try again!')
    }
}
```

The first case checks if the intent is weather. If the intent is weather it pulls out the entity city, and call the API with that city. If city doesn't exists, it will default to check the weather in Oslo.

The seconds case will match if the intent is greeting. Here we will do nothing, so we just add a break.

The default case is if the intent could not be matched.
