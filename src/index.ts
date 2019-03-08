import { config } from 'dotenv';
const result = config();

if (result.error) {
    throw result.error;
}

console.log(result.parsed);

import { TenebrotBot } from './TenebrotBot';

console.log('See this in your browser console: Typescript Webpack Starter Launched');

const tenebrot = new TenebrotBot();
tenebrot.listen();
