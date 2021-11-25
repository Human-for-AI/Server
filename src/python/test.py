# def ObjectDetection(img):
#     model = torch.load('./yolo.pth')
#     result = model(img)
#     df = result.pandas().xyxy[0]

#     return list(df['name'])

import sys

def getValue(test): 
    print(test)
    
if __name__ == '__main__':
    getValue(sys.argv[1])