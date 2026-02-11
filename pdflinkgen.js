export function pdflinkgen(string){
    const i=string.indexOf('!');
    if(i===-1){
        return "No seperator found"
    }
    return string.substring(0,i)

}

let ans=pdflinkgen("V75ZU!3RRVS:aa8/836.6V/VT.2XagkbbiceU!e7bdf/jg-eekg-gg7j-cdf9-7c9gc9igkh9g-8WY92X67.V75")
function strcheck(ans){
        let result = new Set();

}