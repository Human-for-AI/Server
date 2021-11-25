import torch
import sys
import json

print('0')


def ObjectDetection(img):
    print('1')
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

    model = torch.load('./src/python/yolo.pth')
    result = model(img)
    df = result.pandas().xyxy[0]
    json_return = {
        "class" : list(df["name"]) 
    }
    json_string = json.dumps(json_return)
    return json_string

ObjectDetection("./uploads/2021-11-26T0:40:10.0.jpeg")
# if __name__ == '__main__':
#     ObjectDetection(sys.argv[1])
