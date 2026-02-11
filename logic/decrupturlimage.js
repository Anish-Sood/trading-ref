const cipher="2Y/46U!3RRVS:aa/X7T6-RW2-WQR.Sh./V-SWQR3-j./Y/LWX/OS.8WYavQ9Z28/R2WXH/R/arwCa8/Vaikieakjaiiav/46U!ii_kj_ikie_kkj_8/V.1V4Y%ii_kj_ikie_kki_8/V.1V4Y%ii_kj_ikie_kkh_8/V.1V4Y%ii_kj_ikie_kkg_8/V.1V4Y%ii_kj_ikie_kkf_8/V.1V4Y%ii_kj_ikie_kke_8/V.1V4Y%ii_kj_ikie_kkd_8/V.1V4Y%ii_kj_ikie_kkc_8/V.1V4Y%ii_kj_ikie_kkb_8/V.1V4Y%ii_kj_ikie_kjk_8/V.1V4Y%ii_kj_ikie_kjj_8/V.1V4Y%ii_kj_ikie_kji_8/V.1V4Y%ii_kj_ikie_kjh_8/V.1V4Y%ii_kj_ikie_kjg_8/V.1V4Y%ii_kj_ikie_kjf_8/V.1V4Y%ii_kj_ikie_kje_8/V.1V4Y%ii_kj_ikie_kjd_8/V.1V4Y%ii_kj_ikie_kjc_8/V.1V4Y%ii_kj_ikie_kjb_8/V.1V4Y%ii_kj_ikie_kik_8/V.1V4Y%ii_kj_ikie_gjj_8/V.1V4Y%ii_kj_ikie_gji_8/V.1V4Y%ii_kj_ikie_gkj_8/V.1V4Y%ii_kj_ikie_gki_8/V.1V4Y%ii_kj_ikie_gkh_8/V.1V4Y%ii_kj_ikie_gkg_8/V.1V4Y%ii_kj_ikie_gkf_8/V.1V4Y%ii_kj_ikie_gke_8/V.1V4Y%ii_kj_ikie_gkd_8/V.1V4Y%ii_kj_ikie_gkc_8/V.1V4Y%ii_kj_ikie_gkb_8/V.1V4Y%ii_kj_ikie_gjk_8/V.1V4"
function decrypt(cipher) {
    const sidhhi = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/";
    const ulti = "/9876543210ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba";
    let result = '';
  
  for (let i = 0; i < cipher.length; i++) {
    const char = cipher[i];
    const index = ulti.indexOf(char);
    if (index !== -1) {
      result += sidhhi[index];
    } 
    else {
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