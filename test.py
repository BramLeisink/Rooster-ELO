import requests
import json

institution = "mondialcollege" #input("Institution: ")
code = input("Code: ")

base_url = f"https://{institution}.zportal.nl/api/v3"

# acces_token = requests.post(f"{base_url}/oauth/token?grant_type=authorization_code&code={code}")

# print(acces_token.json())

schedule = requests.get(f"{base_url}/users?access_token=23bfb452j4uth624urbp145nml&code=200256")

with open("schedule.json", "w+") as f:
    json.dump(schedule.json(), f, indent=4)