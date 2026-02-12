import hashlib
import hmac
import datetime
import urllib.parse

def deobfuscate( encrypted_str):

    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/"

    reversed_chars = chars[::-1] 
    
    result = ""
    for char in encrypted_str:
        if char in reversed_chars:
            index = reversed_chars.index(char)
            result += chars[index]
        else:
            result += char
    return result

enc_bucket_path = "9/80QV"                         
enc_region      = "S4kh"                          
enc_host        = "87X.RT/72X4T65.8WY"             
enc_access_key  = "v7Qi29wtbeU6Un4gj9cJ"           
enc_secret_key  = "xb7G/I1fiyiPvwQBEv3Ls5Tx89dbMRbwGXXenkzj"

bucket_path = deobfuscate(enc_bucket_path)
region      = deobfuscate(enc_region)
host        = deobfuscate(enc_host)
access_key  = deobfuscate(enc_access_key)
secret_key  = deobfuscate(enc_secret_key)

# print(f"    Region: {region}")
# print(f"    Host:   {host}")


def sign( key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

def get_signature_key( key, date_stamp, region_name, service_name):
    k_date = sign(('AWS4' + key).encode('utf-8'), date_stamp)
    k_region = sign(k_date, region_name)
    k_service = sign(k_region, service_name)
    k_signing = sign(k_service, 'aws4_request')
    return k_signing

def generate_link(date_string):
    t_now = datetime.datetime.utcnow()
    amz_date = t_now.strftime('%Y%m%dT%H%M%SZ') 
    date_stamp = t_now.strftime('%Y%m%d')

    json_filename = f"{date_string.replace('-', '')}.json"
    
    service = "s3"

    credential_scope = f"{date_stamp}/{region}/{service}/aws4_request"

    encoded_scope = urllib.parse.quote(credential_scope, safe='')

    
    canonical_query_string = (
        f"X-Amz-Algorithm=AWS4-HMAC-SHA256&"
        f"X-Amz-Credential={access_key}%2F{encoded_scope}&"
        f"X-Amz-Date={amz_date}&"
        f"X-Amz-Expires=60&"
        f"X-Amz-SignedHeaders=host"
    )
    
    canonical_headers = f"host:{host}\n"
    signed_headers = "host"
    payload_hash = "UNSIGNED-PAYLOAD"
    
    canonical_request = (
        f"GET\n"
        f"/{bucket_path}/{json_filename}\n"
        f"{canonical_query_string}\n"
        f"{canonical_headers}\n"
        f"{signed_headers}\n"
        f"{payload_hash}"
    )
    
 
    algorithm = "AWS4-HMAC-SHA256"
    digest = hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()
    string_to_sign = f"{algorithm}\n{amz_date}\n{credential_scope}\n{digest}"
    
    signing_key = get_signature_key(secret_key, date_stamp, region, service)
    
    signature = hmac.new(signing_key, string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()
    

    final_url = (
        f"https://{host}/{bucket_path}/{json_filename}?"
        f"{canonical_query_string}&"
        f"X-Amz-Signature={signature}"
    )
    
    return final_url

def link_daily(date):
    
    target_date = date
    
    url = generate_link(target_date)
    
    print(url)
    return url
    