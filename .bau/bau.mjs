import { readFileSync, writeFileSync } from 'node:fs';
import * as Babel from '@babel/standalone';
const [, , quelle, ziel] = process.argv;
const code = readFileSync(quelle, 'utf8');
const out = Babel.transform(code, { presets: [['react', {}]], sourceType: 'script', compact: false }).code;
writeFileSync(ziel, out + '\n');
console.log('geschrieben:', ziel, out.length, 'Zeichen');
