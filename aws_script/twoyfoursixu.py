import requests
def decrypt(cipher):
    sidhhi = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/"
    ulti = "/9876543210ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba"
    result = []
    
    for char in cipher:
        index = ulti.find(char)
        if index != -1:
            result.append(sidhhi[index])
        else:
            result.append(char)
            
    return "".join(result)

def split_for_filenames(string, separator='m%'):
    filenames = string.split(separator)
    # Returns [full_name, first_10_chars]
    return [[name, name[:10]] for name in filenames]

def split_by_q(string):
    parts = string.split('q!')
    if len(parts) < 3:
        return None
    
    return {
        "type": parts[0],
        "base_url": parts[1],
        "files_data": split_for_filenames(parts[2])
    }

def main(cipher):
    decrypted_text = decrypt(cipher)
    result = split_by_q(decrypted_text)
    
    if result:
        urls = [f"{result['base_url']}/{item[0]}" for item in result['files_data']]
        images = []

        print(f"Downloading {len(urls)} images...")
        for url in urls:
            try:
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    img = Image.open(io.BytesIO(response.content))
                    if img.mode == 'RGBA':
                        img = img.convert('RGB')
                    images.append(img)
                else:
                    print(f"Failed to download: {url}")
            except Exception as e:
                print(f"Error downloading {url}: {e}")

        if images:
            filename = "output_newspaper.pdf"
            images[0].save(
                filename, 
                save_all=True, 
                append_images=images[1:]
            )
            print(f"Successfully created: {filename}")
        else:
            print("No images were downloaded.")