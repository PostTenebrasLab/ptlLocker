import { config } from 'dotenv';
config();
import { TenebrotBot } from './TenebrotBot';

console.log('See this in your browser console: Typescript Webpack Starter Launched');

const tenebrot = new TenebrotBot();
tenebrot.listen();
