import requests
import PyPDF2
import io

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
        writer = PyPDF2.PdfWriter()
        print(f"processing pdf pages")

        for name, password in result['files_data']:
            url = f"{result['base_url']}/{name}"
            try:
                response = requests.get(url, timeout=15)
                if response.status_code == 200:
                    pdf_stream = io.BytesIO(response.content)
                    reader = PyPDF2.PdfReader(pdf_stream)
                    if reader.is_encrypted:
                        reader.decrypt(password)
                    for page in reader.pages:
                        writer.add_page(page)
                else:
                    print(f"failed to download: {url}")
            except Exception as e:
                print(f"error{url}: {e}")

        if len(writer.pages) > 0:
            output_filename = "final_newspaper.pdf"
            with open(output_filename, "wb") as f:
                writer.write(f)
            print(f"created: {output_filename}")
            return output_filename
        else:
            print("no pages found")
            return None
    return None