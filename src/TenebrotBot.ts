// telegram bot api bugfix. Don't move nor delete. See:
// https://github.com/yagop/node-telegram-bot-api/issues/319 ,
// https://github.com/yagop/node-telegram-bot-api/issues/540 .
process.env.NTBA_FIX_319 = '1';
// End bugfix

import * as TelegramBot from 'node-telegram-bot-api';

const BUTTONS: string[] = [
    'I am the Doctor',
    'Your ally',
    'A friend of the Doctor',
    'Just a simple human'
];

export class TenebrotBot {

    private bot: TelegramBot;

    constructor () {
        const token = process.env.TENEBROT_TOKEN;

        if (!token) {
            throw new Error('Telegram token not found');
        }
        this.bot = new TelegramBot(token, { polling: true });
    }

    public listen (): void {

        this.bot.onText(/\/start/, this.onStart.bind(this));

        this.bot.on('message', (msg: TelegramBot.Message) => {
            console.log(msg);
            // if (msg.text === '\\start' || msg.text === 'hello') {
            //     this.askWhoAreYou(msg.chat.id);
            // } else {
            //     this.reply(msg.chat.id, msg.text);
            // }
        });
    }

    private onStart (msg: TelegramBot.Message): void {
        console.log('START');
        console.dir(msg);
        console.log('START - end');
        this.createStartResponse(msg.chat.id);
    }

    private askWhoAreYou (chat_id: number) {
        let msg = 'I am Dalek! Who are you ?';
        let buttons: TelegramBot.KeyboardButton[][] = [
            [{ text: BUTTONS[0] }, { text: BUTTONS[1] }],
            [{ text: BUTTONS[2] }, { text: BUTTONS[3] }]
        ];
        let replyKeybord: TelegramBot.ReplyKeyboardMarkup = { keyboard: buttons, one_time_keyboard: true };
        let options: TelegramBot.SendBasicOptions = { reply_markup: replyKeybord };
        this.bot.sendMessage(chat_id, msg, options);
    }

    private createStartResponse (chat_id: number) {
        let msg = 'Welcome';
        let buttons: TelegramBot.KeyboardButton[][] = [
            [{ text: "I'm not a robot" }],
            [{ text: "I'm a robot" }],
        ];
        let replyKeybord: TelegramBot.ReplyKeyboardMarkup = { keyboard: buttons, one_time_keyboard: true };
        let options: TelegramBot.SendBasicOptions = { reply_markup: replyKeybord };
        this.bot.sendMessage(chat_id, msg, options);
    }

    private reply (chat_id: number, answer: string) {
        let msg: string;
        switch (answer) {
            case BUTTONS[0]:
                msg = 'You are the Doctor! You are the enemy of the Daleks! You must be exterminated!';
                break;
            case BUTTONS[1]:
                msg = 'Liar !! You do not look like a Dalek ! EXTERMINATE !!!!';
                break;
            case BUTTONS[2]:
                msg = 'The Doctor is our enemy, so he and his friends must be exterminated !!!!';
                break;
            case BUTTONS[3]:
                msg = 'All humans must be exterminated !!!';
                break;
            default:
                msg = 'EXTERMINATE !!!! EXTERMINATE !!!!'
        }
        this.bot.sendMessage(chat_id, msg);
    }

    private send (chat_id: number, text: string, options: TelegramBot.SendMessageOptions): void {
        this.bot.sendMessage(chat_id, text, options);
    }

}

export default TenebrotBot;
