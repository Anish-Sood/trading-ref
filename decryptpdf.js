const cipher="V75U!3RRVS:aa/V2.8W76R/9S.8WYaPjaVTWNM?UQ6SR=3RRVS:aa6V/V6T.S/X49/7VT/R272X.2Xa6V/V6TV75a6V/V6Taikif-jiU!ebfi6jjg7j57/.1V4Y%ebfi6f5/9/9/h.1V4Y%ebfi6f59k79jh.1V4Y%ebfi6jjfibd8k.1V4Y%ebfi6f58fcgdh.1V4Y%ebfi6f59fb6h5.1V4Y%ebfi6jjfe6//h.1V4Y%ebfi6f59/c9k9.1V4Y%ebfi6f58k7fig.1V4Y%ebfi6jjf9hj5d.1V4"
function decrypt(cipher) {
    const sidhhi = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/";
    const ulti = "/9876543210ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba";
    let result = '';
  
  for (let i = 0; i < cipher.length; i++) {
    const char = cipher[i];
    const index = ulti.indexOf(char);
    if (index !== -1) {
      result += sidhhi[index];
    } else {
      result += char;
    }
  }
  return result;
}

const decrypted = decrypt(cipher);
console.log("encrypted:", cipher);
console.log("decrypted:", decrypted);



function splitforfilenames(str, separator = 'm%') {
  const filenames = str.split(separator);

  return filenames.map(name => [
    name,
    name.slice(0, 10)
  ]);
}

function splitByQ(str) {
  const parts = str.split('q!');

  return {
    type: parts[0],
    baseUrl: parts[1],
    filesString: splitforfilenames(parts[2])
  };
}

const result = splitByQ(decrypted);

console.log("Type:", result.type);
console.log("\nbase URL:", result.baseUrl);
// console.log("\nFiles String:", result.filesString);

const url=result.filesString.map(item=> `${result.baseUrl}/${item[0]}`)
const keys=result.filesString.map(item=> `${item[1]}`)
console.log(url)
console.log(keys)