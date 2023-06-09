# Discord.JS-v14-Bot-Boilerplate

> **Warning** Discord.JS v14 need you to have [Node.JS](https://nodejs.org/en) version 16.9.x or newer, if you have an old version you will have to update ;).<br>Also for some future features I need some answer to these [polls](https://github.com/TheHellTower/Discord.JS-v14-Bot-Boilerplate#-polls-hyer-link) !

[![CodeFactor](https://www.codefactor.io/repository/github/thehelltower/discord.js-v14-bot-boilerplate/badge)](https://www.codefactor.io/repository/github/thehelltower/discord.js-v14-bot-boilerplate)

## 📜 What it does ?

This is a [discord.js](https://github.com/discordjs/discord.js) v14 Bot Boilerplate.

## 💡 Features

- [x] .env Configuration: Securely store sensitive information and configurations in a .env file.
- [x] Extends discord.js Client: To add custom functionality and handle events.
- [x] Command & /command Handler: Implement a command handler for organizing and managing commands.
    - [x] Aliases
    - [x] Description
    - [x] Permmissions(Bot & User) & Owner Only
    - [ ] Guild Only (Need to implement direct messages reading + add it to "messageCreate" event)*
    - [x] Cooldowns
    - [x] Status(enabled/disabled)
- [x] Ping For Prefix(@bot to get the server prefix)
- [ ] Database Support: Integrate DataBase for persistent data storage.
    - [x] MongoDB
    - [ ] Add another DB support in case the user want to use another one ?*
- [x] Event handling: Set up event handlers to respond to various Discord events.
- [x] Customizable prefixes: Allow server administrators to set custom command prefixes.
- [ ] Dashboard: To configure/use the bot/servers remotely*
    - [ ] Bot configuration(Prefix change)*
    - [ ] Stats ?*
- [ ] Logging: Implement a logging system to track important events and activities.*
- [ ] Error handling: Develop a robust error handling mechanism to handle exceptions gracefully.*
- [ ] Built-in help command: Include a built-in command to provide information about available commands.*
- [ ] Pagination: Implement pagination for commands or other data lists.*
- [ ] Shard System*
    - [ ] Multi-VPS Support*
    
- [ ] Optionnals
    - [ ] Cleanup(Clean the code)
    - [x] Internationalization (i18n) for multi-language support (`French files need to be translated so you will have to work a bit !` and only the commands in `Administration` got translated for the Boilerplate !)

*) **Awaiting star objectives**

## 🎥 Preview

[YouTube video](https://www.youtube.com/watch?v=mULwjLoWoM8)
[Twitter(Tweet)](https://twitter.com/TheHellTower/status/1664408125837852679)
[![](https://i.imgur.com/bteV0pB.png)](https://www.youtube.com/watch?v=mULwjLoWoM8)

## 🤖 Bots Remake | 🌟 Stars
- [ ] 15🌟 | WatchBot
- If you have an idea of bot to be remade, please feel free to [open a issue](https://github.com/TheHellTower/Discord.JS-v14-Bot-Boilerplate/issues/new?title=Bot%20Remake).


## 🌟 Stars

- [ ] 5🌟| Guild Only commands support(+ Direct Messages handling)
- [ ] 10🌟| Another DB Support
- [ ] 15🌟| Logging System + Error handling
- [ ] 20🌟| Built-in help command
- [ ] 25🌟| Pagination System(can be useful for servers list or users list)
- [ ] 30🌟| Dashboard
- [ ] 35🌟| Sharding System (Adapting the commands too)
- [ ] 50🌟| Multi-VPS Sharding Support + tutorial

Obviously, bots doesn't count and will be blocked.

## 📊 Polls (Hyer-Link)

- [Convert Boilerplate To TS](https://strawpoll.com/polls/GeZAO2k5RnV)
- [Another DB Support](https://strawpoll.com/polls/QrgebdEp2Zp)
- [Dashboard](https://strawpoll.com/polls/GJn47pBK3yz)

## 📚 FAQ

<details>
    <summary>
        Did you make the whole template ?
    </summary>
    No.
</details>
<details>
    <summary>
        Can I use it for Discord.JS v14.11.x ?
    </summary>
    Yes, but you are not limited to this version if you know how to use a documentation, their documentation can be found https://old.discordjs.dev/#/docs/discord.js/main/general/welcome.
</details>
<details>
    <summary>
        Is it wrote in TS(TypeScript) ?
    </summary>
    No, but you are free to rewrite it in TS and either open a PR or keep it for yourself I don't mind maintaining it in TS if someone rewrite it.
</details>
<details>
    <summary>
        Will you update this template for future Discord.JS Versions ?
    </summary>
    Yes, but I might stop anytime it depend mostly on the users.
</details>
<details>
    <summary>
        What features do this boilerplate provide ?
    </summary>
    Well, if you scroll up a bit you can see the features list of https://github.com/TheHellTower/Discord.JS-v14-Bot-Boilerplate#-features
</details>
<details>
    <summary>
        Does this boilerplate support internationalization (i18n) for multi-language support ?
    </summary>
    For the moment, no. But it might come with some time.
</details>
<details>
    <summary>
        How can I implement a cooldown system for commands ?
    </summary>
    You don't need to do it, one small and basic exist already. You might want to tae a look at the "example.js" in the "Commands" folder
</details>
<details>
    <summary>
        Why most of the features for commands are not available in /commands ?(Cooldown, status, etc..)
    </summary>
    I got very lazy but feel free to open a PR if you want to add them it should be easy you have the example already(even if it's not perfect) :)
</details>
<details>
    <summary>
        Is there support for automatic command reloading or hot-reloading ?
    </summary>
    Yup, you can use the "reload" command for it ! (It will clear the console too if you don't modify the code)
</details>
<details>
    <summary>
        How can I implement a system for handling user input prompts or interactive dialogs ?
    </summary>
    You can take a look at this command(prefix: https://github.com/TheHellTower/Discord-Bot-List/blob/master/src/Commands/Administration/Prefix.js ) to get a example using dialog and button !
</details>
<details>
    <summary>
        Will you add more features than the planned list later ?
    </summary>
    No, this will only be a boilerplate. However, I will use it for open-source bots that will, have different features ! So feel free to follow me to be notified when a bot get published !
</details>
<details>
    <summary>
        Did you already planned a open-source bot to make with this boilerplate ?
    </summary>
    Yes, maybe I should not say it that "loudly" as the code isn't really clean or well structured there for the moment, but I plan to remake the popular WatchBot !

    Note: I have no intention on breaking or harm their business so I will not include any payment system for the dashboard and directly add the VIP features(also take in note that I will not remake ALL their features for obvious reasons, I said I have no intention on breakinr or harm their business).
</details>
<details>
    <summary>
        Can you really remake ANY bot ?
    </summary>
    Yes and no, it fully depend on you, if you have unrealistic dead-lines for example it will be impossible to achieve your goal.. but yeah otherwise if you are someone realistic it's possible to remake mostly any bot (not ALL due to some obvious reasons, private API usages for official game bots, etc..) !
</details>
<details>
    <summary>
        Do you plan to make the futur bots ONLY in JS or TS ?
    </summary>
    Yes and no, it would depend on a poll, I planned to open a Discord server for polls, etc.. about future open-source repositories(bots, etc..) (or even closed-source projects), it mean you would be able to propose bots to remake + their language(either JS or TS or Both)
</details>
<details>
    <summary>
        I have a permmissions problem, what to do ?
    </summary>
    Well yeah I used the oldly used "Bitwise Permission Flags", I'm not sure if it fork in the template right now as I did all my tests in a guild I own. In the worst case you still can take a look at this: https://discord-api-types.dev/api/discord-api-types-payloads/common#PermissionFlagsBits to get supported flags version :)
</details>
<details>
    <summary>
        Will you do a cleanup on this code ?
    </summary>
    Well, good question.. I'm not sure yet as I might just use it for futur open-source bot and cleanup in their respective repository. But it should be done if I get enough motivation.
</details>
<details>
    <summary>
        Can I support the project ?
    </summary>
    Yes, you can either "sponsor" me with the button on my profile or donate by going there: https://github.com/TheHellTower#-support-my-work and read, if you want to donate through PayPal you can add me on Discord, click here to see my Discord: https://github.com/TheHellTower#-socials.
</details>
<details>
    <summary>
        Can I contribute to the project ?
    </summary>
    Yes, feel free to fork it, updated it as you wish as long as you don't break it and open a PR that will be reviewed !
</details>
<details>
    <summary>
        I need some help to setup my bot, do you give support ?
    </summary>
    Yes and no, I can't just do that and see a bunch of people in my DMs to setup their bot. However, I can do it for:
    - 5€) "Support the first 48 hours"
    - 25€) "Support the first 2 weeks" 
    - 50€) "Support the first month*"

    Note: The support is only for this code base, if you haven't altered the structure too much(Code cleanup doesn't count as too much altered), no other code in your bot such as a command you added.
    *) Include code support even for commands you added.

    Or you also can be patient and wait a few months for me to make the wiki as it's not planned for now.
</details>
<details>
    <summary>
        Can you make me a custom bot with everything I need ?
    </summary>
    Yes and no, like I said above, I can't just do that and see a bunch of people in my DMs to setup their bot. However, You can send me an email at: "thehelltower@tuta.io" with your offer(price + details such as features, commands, db system, etc..)

    Note: Support for the first month included(more if the offer nice).
</details>
<details>
    <summary>
        I have a question, can I contact you ?
    </summary>
    Yes you can either by opening a issue: https://github.com/TheHellTower/Discord.JS-v14-Bot-Boilerplate/issues/new or send me an email at: "thehelltower@tuta.io" or contact me on one of my socials here: https://github.com/TheHellTower#-socials

    Note: Only for questions no code support.
</details>