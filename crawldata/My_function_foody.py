import re
import os
import json
import copy
import time
import urllib3
import random
import pathlib
import aiohttp  
import asyncio
import selenium
import requests
import pandas as pd
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from urllib3.exceptions import InsecureRequestWarning
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException


def scroll_until_end(driver, max_time=60):
    """
    Cuộn xuống từng chút một cho đến khi không thể cuộn thêm được nữa hoặc hết thời gian.
    
    Args:
        driver: Selenium WebDriver instance.
        max_time (int): Thời gian tối đa để cuộn (giây).
    """
    last_height = driver.execute_script("return document.body.scrollHeight")
    start_time = time.time()  # Thời gian bắt đầu
    
    while True:
        elapsed_time = time.time() - start_time
        if elapsed_time > max_time:
            print("Reached maximum scroll time.")
            break

        # Cuộn xuống từng đoạn nhỏ
        driver.execute_script("window.scrollBy(0, 1500);")
        
        # Dừng một chút để chờ nội dung tải
        time.sleep(random.uniform(0.3, 0.7))
        
        # Kiểm tra chiều cao trang mới
        new_height = driver.execute_script("return document.body.scrollHeight")
        
        # Dừng nếu không có thay đổi
        if new_height == last_height:
            break
        
        last_height = new_height

def click_load_more(driver, element_id="scrollLoadingPage"):
    """
        Tìm và nhấp vào nút "Tải thêm" trên trang web bằng Selenium.

        Args:
            driver (webdriver): Đối tượng trình điều khiển Selenium WebDriver để tương tác với trang web.
            element_id (str): ID của phần tử nút "Tải thêm". Mặc định là "scrollLoadingPage".
    """
    try:
        load_more_element = driver.find_element(By.ID, element_id)
        actions = ActionChains(driver)
        actions.move_to_element(load_more_element).perform()
        load_more_element.click()
        time.sleep(2)
    except Exception as e:
        return False
    return True

def click_close_button(driver):

    """
        Tìm và nhấn vào nút "Đóng" có class "btn-cancel btn-close".

    Args:
        driver: Selenium WebDriver instance.
    """
    try:
        close_button = driver.find_element(By.CLASS_NAME, "btn-cancel.btn-close")
        close_button.click()
        time.sleep(2)
    except Exception as e:
        return False
    return True

def write_file_txt(links, output_file):
    """
    Ghi danh sách các liên kết vào một tệp .txt.

    Args:
        links (list): Danh sách các liên kết cần ghi.
        output_file (str): Tên tệp đầu ra (mặc định là 'extracted_links.txt').
    """

    with open(output_file, "w", encoding="utf-8") as file:
        for link in links:
            file.write(link + "\n")

def read_file_txt(input_file):
    """
    Đọc dữ liệu từ một tệp .txt và trả về danh sách các dòng.

    Args:
        input_file (str): Tên tệp cần đọc (mặc định là 'extracted_links.txt').

    Returns:
        list: Danh sách các dòng trong tệp.
    """
    with open(input_file, "r", encoding="utf-8") as file:
        links = file.read().splitlines()
    return links


def write_dict_txt(data, output_file):
    """
    Ghi dữ liệu dạng danh sách các dict vào tệp dưới dạng JSON.

    Args:
        data (list): Danh sách dữ liệu nhà hàng.
        output_file (str): Tên tệp đầu ra.
    """
    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def read_dict_txt(file_path):
    """
    Đọc dữ liệu từ một file TXT và chuyển đổi nội dung thành một đối tượng Python (danh sách hoặc dictionary).
    
    Args:
        file_path (str): Đường dẫn tới file TXT cần đọc. File này phải chứa dữ liệu JSON hợp lệ.
    
    """
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()  # Đọc toàn bộ nội dung của file
    return json.loads(content)  # Chuyển đổi nội dung từ chuỗi JSON sang đối tượng Python


# Hàm lấy dữ liệu đánh giá và bình luận
def extract_ratings_and_comments(soup):
    ratings = {}
    comments = {}

    # Tổng số bình luận
    total_comments_tag = soup.select_one(".summary b")
    if total_comments_tag:
        try:
            comments["total_comments"] = int(total_comments_tag.text.strip())
        except ValueError:
            comments["total_comments"] = 0

    # Các mức đánh giá bình luận
    comment_ratings_tags = soup.select(".ratings-numbers")
    comment_ratings = {}
    for tag in comment_ratings_tags:
        try:
            count_tag = tag.select_one("b")
            label_tag = tag.select_one(".rating-levels")
            if count_tag and label_tag:
                count = int(count_tag.text.strip())
                label = label_tag.text.strip().replace(count_tag.text.strip(), "").strip()
                comment_ratings[label] = count
        except Exception as e:
            print(f"Error extracting comment ratings: {e}")
    comments["comment_ratings"] = comment_ratings

    # Điểm chi tiết theo tiêu chí
    detailed_points = {}
    detailed_points_rows = soup.select(".micro-home-static table tr")
    for row in detailed_points_rows:
        try:
            columns = row.find_all("td")
            if len(columns) == 3:
                criterion = columns[0].text.strip()
                point = columns[2].select_one("b")
                if point:
                    detailed_points[criterion] = float(point.text.strip())
        except Exception as e:
            print(f"Error extracting detailed points: {e}")
    ratings["detailed_points"] = detailed_points

    # Điểm trung bình tổng
    average_rating_tag = soup.select_one(".ratings-boxes-points b")
    if average_rating_tag:
        try:
            ratings["average_rating"] = float(average_rating_tag.text.strip())
        except ValueError:
            ratings["average_rating"] = 0.0

    return ratings, comments