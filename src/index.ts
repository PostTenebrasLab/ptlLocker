import { config } from 'dotenv';
const result = config();

import figlet = require('figlet');
import { TenebrotBot } from './TenebrotBot';

if (result.error) {
    throw result.error;
}

const figletCallback = (err: Error, data: string) => {
    if (err) {
        console.log('Figlet - Something went wrong...');
        console.dir(err);
    }
    console.log(data)
}

figlet('PTL', 'ANSI Shadow', figletCallback);
figlet('locker \n system\n  manager', 'Small Slant', figletCallback);

const tenebrot = new TenebrotBot();
tenebrot.listen();
