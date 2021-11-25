import torch
import sys
torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

def ObjectDetection(img):
    model = torch.load('./yolo.pth')
    result = model(img)
    df = result.pandas().xyxy[0]

    print(list(df['name']))

if __name__ == '__main__':
    ObjectDetection(sys.argv[1])