import torch
import sys
import json

torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

def ObjectDetection(img):
    model = torch.load('./yolo.pth')
    result = model(img)
    df = result.pandas().xyxy[0]
    json_return = {
        "class" : list(df["name"]) 
    }
    json_string = json.dumps(json_return)
    return json_string
# if __name__ == '__main__':
#     ObjectDetection(sys.argv[1])
