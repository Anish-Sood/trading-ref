
const cipher="V75ZU!3RRVS:aa8/836.6V/VT.2XagkbbghfU!gh8/i7j7-69g5-gg9b-/c69-k95ckc9i7eib-8WY92X67.V75Y%eck8fi6b-bhdg-g6id-cjgg-k8efjj65jfi7-8WY92X67.V75Y%kbedijki-hdf/-g6i5-97dj-kgkgf66jkbjk-8WY92X67.V75Y%f877ke//-b6k9-g6jc-9iid-56e9/jdfgj6j-8WY92X67.V75Y%f/j6b777-5bb8-g/k5-cghk-76//g8dd5hi5-8WY92X67.V75Y%d5g58fh6-de/e-gfie-/59/-/k977ceeg8ik-8WY92X67.V75Y%i9/gjc89-cji/-g5b5-97jc-8f7ckigbcj9g-8WY92X67.V75Y%h66bedjb-5956-gf7i-b6k5-6hdcgc7hkfkf-8WY92X67.V75Y%/976fg/i-6he6-g/7j-b5bg-6ijkigjckhe9-8WY92X67.V75Y%dccg7b5/-e8fc-g89d-/ee9-5h59ghk6j5jb-8WY92X67.V75Y%/8/86ieb-k7ki-g956-c5e9-57d6bjdf7b85-8WY92X67.V75Y%gj9k869c-df/f-gcj9-9kk5-cei9jeij9kke-8WY92X67.V75"

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
console.log("\nbase url:", result.baseUrl);
// console.log("\nFiles String:", result.filesString);

const url=result.filesString.map(item=> `${result.baseUrl}/${item[0]}`)
const keys=result.filesString.map(item=> `${item[1]}`)
console.log(url)
console.log(keys)


