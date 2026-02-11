import hashlib
import hmac
import datetime
import urllib.parse
import requests

class NewspaperScraper:
    def __init__(self):
        # 1. RAW OBFUSCATED STRINGS (Found in app.js DataManager & CryptoUtils)
        self.enc_bucket_path = "9/80QV"                          # Variable 't'
        self.enc_region      = "S4kh"                            # Variable 'n'
        self.enc_host        = "87X.RT/72X4T65.8WY"              # Variable 'i'
        self.enc_access_key  = "v7Qi29wtbeU6Un4gj9cJ"            # Inside 'p' construction
        self.enc_secret_key  = "xb7G/I1fiyiPvwQBEv3Ls5Tx89dbMRbwGXXenkzj" # Inside 'm' construction

        # 2. DECODE SECRETS AUTOMATICALLY
        print("[-] Deobfuscating credentials...")
        self.bucket_path = self.deobfuscate(self.enc_bucket_path)
        self.region      = self.deobfuscate(self.enc_region)
        self.host        = self.deobfuscate(self.enc_host)
        self.access_key  = self.deobfuscate(self.enc_access_key)
        self.secret_key  = self.deobfuscate(self.enc_secret_key)
        
        print(f"    Region: {self.region}")
        print(f"    Host:   {self.host}")

    def deobfuscate(self, encrypted_str):
        """
        Replicates CryptoUtils.deobfuscateString from app.js
        """
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/"
        # The JS uses split("").reverse().join(""), so we reverse the string
        reversed_chars = chars[::-1] 
        
        result = ""
        for char in encrypted_str:
            if char in reversed_chars:
                index = reversed_chars.index(char)
                result += chars[index]
            else:
                result += char
        return result

    def sign(self, key, msg):
        """Helper to hash data"""
        return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

    def get_signature_key(self, key, date_stamp, region_name, service_name):
        """Replicates variable 'm' in app.js"""
        k_date = self.sign(('AWS4' + key).encode('utf-8'), date_stamp)
        k_region = self.sign(k_date, region_name)
        k_service = self.sign(k_region, service_name)
        k_signing = self.sign(k_service, 'aws4_request')
        return k_signing

    def generate_link(self, date_string):
        """
        Reconstructs 'w' - The final signed URL
        date_string format: 'YYYY-MM-DD'
        """
        # --- 1. Prepare Dates ---
        # Matches JS: s = (new Date).toISOString()...
        t_now = datetime.datetime.utcnow()
        amz_date = t_now.strftime('%Y%m%dT%H%M%SZ') 
        date_stamp = t_now.strftime('%Y%m%d')
        
        # Matches JS: Utils.formatDate(e) -> replaces hyphens
        json_filename = f"{date_string.replace('-', '')}.json"
        
        # --- 2. Prepare Canonical Request Components ---
        service = "s3"
        
        # Matches JS: d + "/" + n + "/" + r + "/aws4_request"
        credential_scope = f"{date_stamp}/{self.region}/{service}/aws4_request"
        
        # Matches JS: p (Query Params)
        # Note: We must Encode the scope for the URL (JS uses encodeURIComponent)
        encoded_scope = urllib.parse.quote(credential_scope, safe='')
        
        # Python dict for readability, but we will construct the string manually 
        # to ensure exact order matching the JS 'p' variable
        # X-Amz-Algorithm=AWS4-HMAC-SHA256
        # &X-Amz-Credential=...
        # &X-Amz-Date=...
        # &X-Amz-Expires=60
        # &X-Amz-SignedHeaders=host
        
        canonical_query_string = (
            f"X-Amz-Algorithm=AWS4-HMAC-SHA256&"
            f"X-Amz-Credential={self.access_key}%2F{encoded_scope}&"
            f"X-Amz-Date={amz_date}&"
            f"X-Amz-Expires=60&"
            f"X-Amz-SignedHeaders=host"
        )
        
        # Matches JS: l (Canonical Headers)
        canonical_headers = f"host:{self.host}\n"
        signed_headers = "host"
        payload_hash = "UNSIGNED-PAYLOAD"
        
        # Matches JS: c (Canonical Request)
        canonical_request = (
            f"GET\n"
            f"/{self.bucket_path}/{json_filename}\n"
            f"{canonical_query_string}\n"
            f"{canonical_headers}\n"
            f"{signed_headers}\n"
            f"{payload_hash}"
        )
        
        # --- 3. Calculate Signature ---
        # Matches JS: g (String to Sign)
        algorithm = "AWS4-HMAC-SHA256"
        digest = hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()
        string_to_sign = f"{algorithm}\n{amz_date}\n{credential_scope}\n{digest}"
        
        # Matches JS: m (Signing Key)
        signing_key = self.get_signature_key(self.secret_key, date_stamp, self.region, service)
        
        # Matches JS: u (Final Signature)
        signature = hmac.new(signing_key, string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()
        
        # --- 4. Construct Final URL (Variable 'w') ---
        # https://{i}/{t}/{o}?{p}&X-Amz-Signature={u}
        final_url = (
            f"https://{self.host}/{self.bucket_path}/{json_filename}?"
            f"{canonical_query_string}&"
            f"X-Amz-Signature={signature}"
        )
        
        return final_url

if __name__ == "__main__":
    scraper = NewspaperScraper()
    
    # Enter the date you want to scrape (YYYY-MM-DD)
    target_date = "2025-12-02"
    
    print(f"[-] Generating signed link for {target_date}...")
    url = scraper.generate_link(target_date)
    
    print("\n[+] Reconstructed Variable 'w':")
    print(url)
    
    print("\n[-] Attempting to fetch data to verify validity...")
    try:
        r = requests.get(url)
        if r.status_code == 200:
            print("[+] SUCCESS! Valid JSON found.")
            print(f"    Data Size: {len(r.content)} bytes")
            # print(r.json()) # Uncomment to see the raw JSON
        elif r.status_code == 404:
            print("[-] 404 Not Found. The link signature is likely correct, but no edition exists for this specific date.")
        elif r.status_code == 403:
            print("[!] 403 Forbidden. The signature calculation is incorrect or the keys have been rotated.")
        else:
            print(f"[!] HTTP {r.status_code}")
            print(r.text)
    except Exception as e:
        print(f"[!] Error: {e}")