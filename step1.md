##### Add code for sending/receiving messages to/from Watson.

Go to the `message` function. Each time we receive input, we will forward it to Watson through this function.

The `context` variable above the function will hold the context for the bot, which Watson will use to keep track of the conversation.

Add the following code to the function.

```javascript
conversation.message({
        workspace_id: workspace,
        input: {'text': message},
        context: context
    } , function(err, response) {
        console.log(response);
    });
```

Run your code in the terminal by typing `node app.js`. Try to send a message to your bot and inspect the response you get. Cancel the application with `ctrl+c`.

There after complete the `message`-function so it looks like this:
```javascript
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
```
