from selenium import webdriver
from selenium.webdriver.common.by import By
import requests
import io
from PIL import Image
import time
import os

PATH = r"C:/chromedriver_win32/chromedriver.exe"

wd = webdriver.Chrome(executable_path = PATH)

def get_images_from_google(wd, delay, max_images, url):
	def scroll_down(wd):
		wd.execute_script("window.scrollTo(0, document.body.scrollHeight);")
		time.sleep(delay)

	wd.get(url)

	image_urls = set()
	skips = 0

	while len(image_urls) + skips < max_images:
		scroll_down(wd)

		thumbnails = wd.find_elements(By.CLASS_NAME, "Q4LuWd")
		
		if len(thumbnails) == 0:
			break

		for img in thumbnails[len(image_urls) + skips:max_images]:
			try:
				img.click()
				time.sleep(delay)
			except:
				continue

			images = wd.find_elements(By.CLASS_NAME, "n3VNCb")
			for image in images:
				if image.get_attribute('src') in image_urls:
					max_images += 1
					skips += 1
					break

				if image.get_attribute('src') and 'http' in image.get_attribute('src'):
					image_urls.add(image.get_attribute('src'))
					print(f"Found {len(image_urls)}")

	return image_urls


def download_image(download_path, url, file_name):
	try:
		image_content = requests.get(url).content
		image_file = io.BytesIO(image_content)
		image = Image.open(image_file)
		file_path = download_path + file_name

		with open(file_path, "wb") as f:
			image.save(f, "JPEG")

		print("Success")
	except Exception as e:
		print('FAILED -', e)

def download_images(urls, folder_name):
	try:
		os.mkdir(folder_name)
	except Exception as e:
		print(e)
	for i, url in enumerate(urls):
		download_image(f"{folder_name}/", url, str(i) + ".jpg")
urls = get_images_from_google(wd, 1, 200, "https://www.google.com/search?q=tomato&client=firefox-b-d&sxsrf=APq-WBs1f3VpsGvcM5vfIRKFMCVFVXpaLg:1647609736963&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj0lubI4M_2AhXZTmwGHSnYCmQQ_AUoAXoECAIQAw&biw=1366&bih=615&dpr=1")

download_images(urls, "Tomato_Early_Blight")

wd.quit()

# get_images_from_google takes google images as url and stores it in folder mentioned in download_image
# download_image does not create folder