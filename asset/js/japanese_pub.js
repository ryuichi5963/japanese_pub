//
// スクロールバーが表示されているときの
// スクロールダウンの位置決め
//
const setScrollbarWidth = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  // カスタムプロパティの値を更新する
  document.documentElement.style.setProperty("--scrollbar", `${scrollbarWidth}px`);
};

// 表示されたとき
window.addEventListener("load", setScrollbarWidth);
// リサイズしたとき
window.addEventListener("resize", setScrollbarWidth);

//
// DOM操作
//
function setClassValue() {
  let windowOffsetHeight = document.documentElement.clientHeight;
  let windowOffsetWidth = document.documentElement.offsetWidth;

  // PC表示でwindowOffsetHeightが375px以上かつ
  // 705px未満の時
  // またはSP表示でwindowOffsetHeightが375px以上かつ
  // 655px未満の時
  // scrollをrightに
  const scroll = document.querySelectorAll(".scroll");
  if ((windowOffsetHeight >= 375 && windowOffsetHeight < 705 && windowOffsetWidth >= 769) || (windowOffsetHeight >= 375 && windowOffsetHeight < 655 && windowOffsetWidth <= 768)) {
    scroll[0].style.right = "20px";
  } else {
    scroll[0].removeAttribute("style");
  }

  // windowOffsetHeightが375px未満
  // headerの高さを固定
  const header = document.querySelector("header");
  if (windowOffsetHeight < 375 && windowOffsetWidth >= 769) {
    header.style.height = "740px";
  } else if (windowOffsetHeight < 375 && windowOffsetWidth <= 768) {
    header.style.height = "775px";
  } else {
    header.removeAttribute("style");
  }

  // PC表示でwindowOffsetHeightが375px以上かつ
  // 各px未満のとき、captionとtitleのtopを変化
  // SP表示でwindowOffsetHeightが375px以上かつ
  // 各px未満のとき、captionとtitleのtopを変化
  const caption = document.querySelectorAll(".caption");
  const title = document.querySelectorAll(".title");

  if (windowOffsetHeight >= 375 && windowOffsetHeight < 430 && windowOffsetWidth >= 769) {
    title[0].style.top = "43%";
    caption[0].style.top = "28%";
  } else if (windowOffsetHeight >= 375 && windowOffsetHeight < 465 && windowOffsetWidth >= 769) {
    caption[0].style.top = "38%";
  } else if (windowOffsetHeight >= 375 && windowOffsetHeight < 530 && windowOffsetWidth >= 769) {
    caption[0].style.top = "42%";
  } else if (windowOffsetHeight >= 375 && windowOffsetHeight < 455 && windowOffsetWidth <= 768) {
    // SPの指定
    title[0].style.top = "36%";
    caption[0].style.top = "30%";
  } else if (windowOffsetHeight >= 375 && windowOffsetHeight < 505 && windowOffsetWidth <= 768) {
    // SPの指定
    caption[0].style.top = "45%";
  } else {
    title[0].removeAttribute("style");
    caption[0].removeAttribute("style");
  }

  // PC表示でwindowOffsetWidthが1020px未満の時
  // h1の左側にpadding20px設定
  const h1 = document.querySelector("h1");
  if (windowOffsetWidth < 1020 && windowOffsetWidth >= 769) {
    h1.style.paddingLeft = "20px";
  } else {
    h1.removeAttribute("style");
  }

  // PC表示でwindowOffsetWidthが1220px未満の時
  // top-boxの幅を変化
  const topBox = document.querySelectorAll(".top-box");
  if (windowOffsetWidth < 1240 && windowOffsetWidth >= 769) {
    topBox[0].style.right = `calc((100vw - 100vw + 25px - var(--scrollbar)) / 2)`;
    topBox[1].style.right = `calc((100vw - 100vw + 25px - var(--scrollbar)) / 2)`;
  } else {
    topBox[0].removeAttribute("style");
    topBox[1].removeAttribute("style");
  }

  // PC表示でwindowOffsetWidthが960px未満の時
  // processのタイトルのcssを変更
  const processTitleP = document.querySelectorAll(".process .title p");

  if (windowOffsetWidth < 960 && windowOffsetWidth >= 769) {
    processTitleP[0].style.fontSize = "30px";
    processTitleP[0].style.top = "36px";
  } else {
    processTitleP[0].removeAttribute("style");
  }
}

// ウィンドウのリサイズイベントを監視
window.addEventListener("resize", setClassValue);

// 初期設定を呼び出し
setClassValue();

//
// スムーススクロール
//
// 初期のheaderHeightを計算する関数
function calculateHeaderHeight() {
  return document.querySelector("header").offsetHeight;
}

// ウィンドウのリサイズ時にheaderHeightを更新する関数
function updateHeaderHeight() {
  headerHeight = calculateHeaderHeight();
}

// 初期のheaderHeightを計算
let headerHeight = calculateHeaderHeight();

// ウィンドウのリサイズ時にheaderHeightを更新
window.addEventListener("resize", updateHeaderHeight);

// querySelectorAllメソッドを使用してページ内のhref属性が#で始まるものを選択
// forEachメソッドを使って、各アンカータグにクリックされた時の処理
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // クリックされたときのデフォルトの挙動を防ぐ
    e.preventDefault();

    // スクロール位置がheaderHeightの下になるように調整
    const targetPosition = headerHeight;

    // window.scrollTo()を呼び出して、スクロール位置を設定
    // behaviorオプションをsmoothに設定
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});
