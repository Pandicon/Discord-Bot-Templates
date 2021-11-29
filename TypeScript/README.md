# TypeScript Discord bot template
This template contains some basic logic that basically any Discord bot will need - a command handler, events handler, and a connection to a MongoDB database.<br>
This template uses Discord.js v13.3.1, which requires Node version 16.6 or higher to run.

### How to use
Download the code and run `npm install`. That should install all the required dependencies automatically. If this is your first time using TypeScript, you will probably also have to run `npm install -g typescript ts-node`.<br>
You will have to rename the `.env-template` file to `.env` and fill in the credentials. You can leave the MONGO_URI variable empty if you don't want to use MongoDB (make sure to remove all the other MongoDB things if you choose so). Don't leave in the <> that are in the template. If your bot's token was 123 and the Mongo URI was aBc, your .env file should look like this:<br>
```
BOT_TOKEN=123
MONGO_URI=aBc
```
After you set this up, just run `ts-node index.ts` or `ts-node .` to start the bot.