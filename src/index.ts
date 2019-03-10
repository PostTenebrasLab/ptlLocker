#!/usr/bin/env node
import { config } from 'dotenv';
const result = config();
if (result.error) {
    throw result.error;
}

import figlet = require('figlet');
import { TenebrotBot } from './TenebrotBot';

console.log('');

const figletCallback = (err: Error, data: string) => {
    if (err) {
        console.log('Figlet - Something went wrong...');
        console.dir(err);
    }
    console.log(data)
}

figlet('PTL', 'ANSI Shadow', figletCallback);
const tenebrot = new TenebrotBot();
figlet('locker \n system\n  manager', 'Small Slant', figletCallback);
tenebrot.listen();
