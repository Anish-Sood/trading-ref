const cipher="V758U!3RRVS:aa6V/RT20/.8WYaV75aikifajiU!J2X76Te_899b6d.V75"
function decrypt(cipher) {
    const sidhhi = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/";
    const ulti = "/9876543210ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba";
    let result = '';
  
  for (let i = 0; i < cipher.length; i++) {
    const char = cipher[i];
    const index = ulti.indexOf(char);
    console.log(char+" "+index+" "+sidhhi[index])
    if (index !== -1) {
      result += sidhhi[index];
    } else {
      result += char;
    }
  }
  return result;
}

const decrypted = decrypt(cipher);
// console.log("encrypted:", cipher);
// console.log("decrypted:", decrypted);



// function splitforfilenames(str, separator = 'm%') {
//   const filenames = str.split(separator);

//   return filenames.map(name => [
//     name,
//     name.slice(0, 10)
//   ]);
// }

function splitByQ(str) {
  const parts = str.split('q!');
  return {
    type: parts[0],
    baseUrl: parts[1],
    filesString: parts[2]
  };
}

const result = splitByQ(decrypted);

// console.log("Type:", result.type);
// console.log("\nbase URL:", result.baseUrl);
// console.log("\nFiles String:", result.filesString);

// const url=result.filesString.map(item=> `${result.baseUrl}/${item[0]}`)
// const keys=result.filesString.map(item=> `${item[1]}`)
const URL=`${result.baseUrl}/${result.filesString}`
console.log(url)
// console.log(keys)