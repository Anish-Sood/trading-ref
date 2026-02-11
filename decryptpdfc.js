// const cipher="V758U!3RRVS:aaTV6V/V6T.WV6N9WW0066V2X4.OWT06TS.76PaikieakiajjU!833/RR2S4/T3a/Y920/VQT"
const cipher="S4kh"
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
console.log(decrypt(cipher))

// const decrypted = decrypt(cipher);
// // console.log("encrypted:", cipher);
// // console.log("decrypted:", decrypted);



// // function splitforfilenames(str, separator = 'm%') {
// //   const filenames = str.split(separator);

// //   return filenames.map(name => [
// //     name,
// //     name.slice(0, 10)
// //   ]);
// // }

// function splitByQ(str) {
//   const parts = str.split('q!');
//   return {
//     type: parts[0],
//     baseUrl: parts[1],
//     filesString: parts[2]
//   };
// }

// const result = splitByQ(decrypted);

// // console.log("Type:", result.type);
// // console.log("\nbase URL:", result.baseUrl);
// // console.log("\nFiles String:", result.filesString);

// // const url=result.filesString.map(item=> `${result.baseUrl}/${item[0]}`)
// // const keys=result.filesString.map(item=> `${item[1]}`)
// const URL=`${result.baseUrl}/${result.filesString}`
// console.log(URL)
// // console.log(keys)
// const n = await crypto.subtle.importKey("raw", e, {
//                 name: "HMAC",
//                 hash: "SHA-256"
//             }, !1, ["sign"])
s = (new Date).toISOString().replace(/[:-]|\.\d{3}/g, "")
urlcomponent=`Pdu2ibOR96qeqXg41b8B/20260211/sg03/s3/aws4_request`
console.log(encodeURIComponent(urlcomponent))
// console.log(n)