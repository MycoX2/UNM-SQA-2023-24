from flask import Blueprint, render_template
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import requests

blueprint = Blueprint('view', __name__)

api_key = 'AIzaSyBYmJfSCtMZtHG1vXDQiS7U770KajKAQbo'
youtube_api_service_name = 'youtube'
youtube_api_ver = 'v3'

#function to fetch yt videos using data api
def get_youtube_videos():
    youtube = build(youtube_api_service_name, youtube_api_ver, developerKey=api_key)
    request = youtube.search().list(q='Software Qaulity Assurance', type='video', part='snippet', maxResults=12)
    response = request.execute()
    videos = []

    try: 
      response = request.execute()
      for item in response['items']:
          video_id = item['id']['videoId']
          video_title = item['snippet']['title']
          video_thumbnail = item['snippet']['thumbnails']['medium']['url']
          #check if the video has status field and its public 
          #if 'status' in item and item['status'].get('privacyStatus') == 'public':
          videos.append({'id':video_id, 'title':video_title, 'thumbnail':video_thumbnail})
    except HttpError as e: 

        print(f"An error occurred: {e}")
    return videos

@blueprint.route('/')
def index():
    videos = get_youtube_videos()
    return render_template('index.html', videos=videos)
      
    
    
    