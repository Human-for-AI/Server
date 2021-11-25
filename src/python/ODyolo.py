import torch
import sys

def ObjectDetection(img):
    model = torch.load('./yolo.pth')
    result = model(img)
    df = result.pandas().xyxy[0]

    print(list(df['name']))

if __name__ == '__main__':
    ObjectDetection(sys.argv[1])