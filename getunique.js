import fs from 'fs';
import * as pdf from pdflinkgen.js;

const jsonData = fs.readFileSync('options.json', 'utf8');
const options = JSON.parse(jsonData);

// Get all languages
// const languages = Object.keys(options);
// console.log('Languages:');
// console.log(languages)
// languages.forEach(language => console.log(language))


const encryptionFamily = new Set();
const allEditions = new Set();
Object.keys(options).forEach(language => {
    Object.keys(options[language]).forEach(newspaper => {
        Object.keys(options[language][newspaper]).forEach(edition => {
            // allEditions.add(options[language][newspaper][edition]);
            const encryptedstr=options[language][newspaper][edition];
            encryptionFamily.add(pdf.pdf)
        });
    });
});

const strarr=Array.from(allEditions)
console.log(strarr);
// const resultarr;
// strarr.forEach(entry=>{
//     extractBeforeExclamation(entry)
// })

extractBeforeExclamation(strarr)


export function extractBeforeExclamation(strings) {
    let result = new Set();
    
    for (const str of strings) {
        if (str.includes('!')) {
            const beforeExclamation = str.split('!')[0];
            result.add(beforeExclamation);
        } else {
            result.add(str);
        }
    }
    console.log(result)
}