import torch

def ObjectDetection(img):
    model = torch.load('./yolo.pth')
    result = model(img)
    df = result.pandas().xyxy[0]

    return list(df['name'])