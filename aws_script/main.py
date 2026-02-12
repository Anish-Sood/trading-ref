import everylink
import requests
import v75zu

date="2026-02-02"
INITIAL_LINK=everylink.link_daily(date)

required_data = [
    {
        "language": "bengali",
        "newspaper": "Dainik Statesman",
        "edition": "Dainik-Statesman"
    }
]

response = requests.get(INITIAL_LINK)
if response.status_code != 200:
    print(f"Failed to fetch JSON. Status: {response.status_code}")
else:
    data = response.json()
    pdf_path = None

    for option in required_data:
        try:
            
            lang = data.get(option["language"], {})
            news = lang.get(option["newspaper"], {})
            encrypted_link = news.get(option["edition"])
            
            if not encrypted_link:
                print("Edition not found in JSON")
                continue

            prefix = encrypted_link.split('!')[0] if '!' in encrypted_link else "No separator"
            
            if prefix == "V75ZU":
                pdf_path = v75zu.main(encrypted_link)
                
                if pdf_path:
                    break 
                    
        except KeyError as e:
            print(f"Error parsing JSON keys: {e}")