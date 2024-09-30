const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("index");
});

router.get("/project/:id", (req, res) => {
  const id = req.params.id;
  if (id == 1) {
    return res.render("projects/day1/index");
  } else if (id == 2) {
    return res.render("projects/day2/index");
  } else if (id == 3) {
    const html = generateDay3HTML();
    return res.send(html);
  }
});

// Project Day 1 sub pages
router.get("/project/1/check", (req, res) => {
  return res.render("projects/day1/chk_score");
})

router.get("/project/1/add", (req, res) => {
  return res.render("projects/day1/add_assignment");
})

// Project Day 3
const dataList = [];
let alertMessage = "";

router.post("/project/3/add", (req, res, next) => {
  const name = req.body.name;
  const emotion = req.body.emotion;
  const desc = req.body.desc;
  // console.log(name, emotion, desc);

  const now = new Date().toLocaleDateString("ko-KR");

  if (name && emotion && desc) {
    if (
      dataList.filter((datum) => datum.name === name && datum.date === now)
        .length !== 0
    ) {
      alertMessage = "repeated";
    } else {
      dataList.push({
        name,
        emotion,
        description: desc,
        date: now,
      });
    }
  } else {
    alertMessage = "error";
  }
  next();
},
(req, res) => {
  // console.log("redirected");
  res.redirect("/project/3");
}
);

function generateDay3HTML() {
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>하루 한 줄 기분 적기</title>
        <link rel="stylesheet" href="/css/projects/day3/style.css" />
        <link rel="stylesheet" href="/css/projects/day3/media.css" />
      </head>
      <body>
        <div id="floatingButton">
          <a href="/">메인 페이지</a>
        </div>
        <div id="wrap">
          <div class="container">
            <div id="boxInputForm">
              <h1>하루 한 줄 기분 적기</h1>
  `;

  if (alertMessage === "error") {
    html += `
              <div class="form-alert" role="alert">
                이름/감정을 정확히 입력했는지 확인해주세요.
              </div>
    `;
    alertMessage = "";
  } else if (alertMessage === "repeated") {
    html += `
              <div class="form-alert" role="alert">
                한 사람 당 하루에 감정 하나만을 쓸 수 있습니다.
              </div>
    `;
    alertMessage = "";
  }

  html += `
              <form action="/project/3/add" method="post">
                <div class="form-item">
                  <label for="inputTxtName">이름</label>
                  <input
                    id="inputTxtName"
                    name="name"
                    type="text"
                    placeholder="이름을 적어주세요."
                  />
                </div>
                <div class="form-item">
                  <label for="inputSelectEmotion">지금 내 감정</label>
                  <select name="emotion" id="inputSelectEmotion">
                    <option disabled selected value>
                      -- 감정을 선택해주세요 --
                    </option>
                    <option value="기쁨">기쁨</option>
                    <option value="슬픔">슬픔</option>
                    <option value="분노">분노</option>
                    <option value="두려움">두려움</option>
                    <option value="창피함">창피함</option>
                  </select>
                </div>
                <div class="form-item">
                  <label for="inputTxtDesc">설명</label>
                  <input
                    id="inputTxtDesc"
                    name="desc"
                    type="text"
                    placeholder="자세히 말해주세요."
                  />
                </div>
                <div class="form-footer">
                  <button type="submit">추가하기</button>
                </div>
              </form>
            </div>
            <div id="boxShowList">
              <div class="list-head">
                <div class="list-row">
                  <div class="list-item">작성자</div>
                  <div class="list-item">감정</div>
                  <div class="list-item">설명</div>
                  <div class="list-item">날짜</div>
                </div>
              </div>
              <div class="list-body">
  `;

  // console.log("generating HTML");
  dataList.forEach((item) => {
    html += `
                <div class="list-row">
                  <div class="list-item">${item.name}</div>
                  <div class="list-item">${item.emotion}</div>
                  <div class="list-item">${item.description}</div>
                  <div class="list-item">${item.date}</div>
                </div>
    `;
  });

  html += `  
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>  
  `;

  return html;
}

module.exports = router;