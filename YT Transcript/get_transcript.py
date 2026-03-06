from youtube_transcript_api import YouTubeTranscriptApi
import sys

try:
    transcript = YouTubeTranscriptApi.get_transcript("XtraHVUBcMU", languages=['pt', 'en'])
    with open("transcript_output_utf8.txt", "w", encoding="utf-8") as f:
        for t in transcript:
            f.write(t['text'] + "\n")
except Exception as e:
    with open("transcript_output_utf8.txt", "w", encoding="utf-8") as f:
        f.write("Error: " + str(e))
