# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
import os
import time
import requests
from bs4 import BeautifulSoup
from pprint import pprint
import csv

# wd = webdriver.Firefox()
# wd.get("https://plantix.net/en/library/plant-diseases")
time.sleep(1)
# input_field = wd.find_elements(By.CSS_SELECTOR, "input.ng-valid")
# search_field = input_field[0]
with open("./diseases.csv") as f:
    info = f.read()
info = info.split(",")
# print(info)
# final_info = []
# urls = []
# # print(info)
# for i in info:
# 
#     j = i.split("___")[1]
#     j = j.replace("_", " ")
#     if j != "healthy":
#         search_field.clear()
#         search_field.send_keys(j)
#         search_field.send_keys(Keys.ENTER)
#         time.sleep(1)
#         try:
#             urls += [wd.find_element(By.CSS_SELECTOR, "div.results-wrapper").find_element(By.CSS_SELECTOR, "a").get_attribute("href")]
#             final_info += [[i]]
#         except:
#             continue
urls = ['https://plantix.net/en/library/plant-diseases/100006/apple-scab/', 'https://plantix.net/en/library/plant-diseases/300006/black-rot', 'https://plantix.net/en/library/plant-diseases/100009/european-pear-rust','https://plantix.net/en/library/plant-diseases/100002/powdery-mildew/', 'https://plantix.net/en/library/plant-diseases/100082/common-rust-of-maize/', 'https://plantix.net/en/library/plant-diseases/100065/northern-leaf-blight/', 'https://plantix.net/en/library/plant-diseases/100350/black-rot-of-grape/', 'https://plantix.net/en/library/plant-diseases/300050/bacterial-spot-and-speck-of-tomato/','https://plantix.net/en/library/plant-diseases/300003/bacterial-spot-of-pepper', 'https://plantix.net/en/library/plant-diseases/100321/early-blight/', 'https://plantix.net/en/library/plant-diseases/100040/potato-late-blight', 'https://plantix.net/en/library/plant-diseases/100002/powdery-mildew/', 'https://plantix.net/en/library/plant-diseases/100019/cherry-leaf-scorch/', 'https://plantix.net/en/library/plant-diseases/300050/bacterial-spot-and-speck-of-tomato/', 'https://plantix.net/en/library/plant-diseases/100321/early-blight/', 'https://plantix.net/en/library/plant-diseases/100046/tomato-late-blight/', 'https://plantix.net/en/library/plant-diseases/100257/leaf-mold-of-tomato/', 'https://plantix.net/en/library/plant-diseases/100152/septoria-leaf-spot/', 'https://plantix.net/en/library/plant-diseases/100109/target-spot-of-soybean/', 'https://plantix.net/en/library/plant-diseases/200036/tomato-yellow-leaf-curl-virus/']
final_info = [['Apple___Apple_scab'], ['Apple___Black_rot'], ['Apple___Cedar_apple_rust'], ['Cherry_(including_sour)___Powdery_mildew'], ['Corn_(maize)___Common_rust_'], ['Corn_(maize)___Northern_Leaf_Blight'], ['Grape___Black_rot'], ['Peach___Bacterial_spot'], ['Pepper_bell___Bacterial_spot'], ['Potato___Early_blight'], ['Potato___Late_blight'], ['Squash___Powdery_mildew'], ['Strawberry___Leaf_scorch'], ['Tomato___Bacterial_spot'], ['Tomato___Early_blight'], ['Tomato___Late_blight'], ['Tomato___Leaf_Mold'], ['Tomato___Septoria_leaf_spot'], ['Tomato___Target_Spot'], ['Tomato___Tomato_Yellow_Leaf_Curl_Virus']]


for i, url in enumerate(urls):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    image_src = soup.find_all('img')[1]['src']
    final_info[i] += [image_src]
    solns = soup.find_all('div', {"class": "collapsible"})
    for soln in solns:
        try:
            final_info[i] += [soln.find('p').text.replace(',', ' ')]
        except:
            continue

with open("out.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(final_info)

# print(wd.page_source)
# time.sleep(1)
wd.quit()