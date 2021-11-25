const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const _ = require("lodash");
const spawn = require("child_process").spawn;
const app = express();

// 파일 업로드 허용
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// 미들 웨어 추가
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("uploads"));

function convertWebToString(data) {
  //가져온 데이터가 Object 형태인데, 왜인지 모르겠지만 eval로 다시 초기화 하지 않으면 버퍼로 데이터를 가지고 있음
  let myJsonString = data.toString();
  myJsonString = eval(myJsonString); // console.log(myJsonString)
  return data; // //eval로 초기화 시 array형태의 데이터 얻을 수 있음.
  // console.log(myJsonString)
  //
}

app.post("/upload", async (req, res) => {
  const today = new Date();
  const current =
    String(today.getFullYear()) +
    "-" +
    String(today.getMonth() + 1) +
    "-" +
    String(today.getDate());
  const time =
    String(today.getHours()) +
    ":" +
    String(today.getMinutes()) +
    ":" +
    String(today.getSeconds());
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "파일 업로드 실패",
      });
    } else {
      let f = req.files.uploadFile;
      f.mv(
        "./uploads/" +
          current +
          "T" +
          time +
          "." +
          "0" +
          "." +
          String(f.mimetype).substr(6)
      );
      const fileName =
        current + "T" + time + "." + "0" + "." + String(f.mimetype).substr(6);
      const result = spawn("python", ["./src/python/ODyolo.py", "" + fileName]);
      result.stdout.on("data", (result) => {
        res.send(convertWebToString(data));
        res.end();
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/upload-multi", async (req, res) => {
  const today = new Date();
  const current =
    String(today.getFullYear()) +
    "-" +
    String(today.getMonth() + 1) +
    "-" +
    String(today.getDate());
  const time =
    String(today.getHours()) +
    ":" +
    String(today.getMinutes()) +
    ":" +
    String(today.getSeconds());
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "파일 업로드 실패",
      });
    } else {
      let data = [];

      _.forEach(_.keysIn(req.files.photos), (key) => {
        let photo = req.files.photos[key];

        photo.mv(
          "./uploads/" +
            current +
            "T" +
            time +
            "." +
            key +
            "." +
            String(photo.mimetype).substr(6)
        );

        data.push({
          name: key,
          minetype: photo.minetype,
          size: photo.size,
        });
      });

      // return response
      res.send({
        status: true,
        message: "파일들이 업로드 되었습니다.",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// 포트 설정
const port = 3000;

app.listen(port, () => {
  console.log(`Server is on port ${port}.`);
});
