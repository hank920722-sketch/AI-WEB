/* ============================================================
   script.js — 集換式卡片交流展 一頁式網站
   初學者說明：
   - 這個檔案負責所有互動行為（JavaScript 的工作）
   - HTML 負責「結構」、CSS 負責「樣式」、JS 負責「行為」
   - 目前只有 Hero 區的功能，之後每新增一個區塊就在下方繼續補充
   ============================================================ */
 
 
/* ============================================================
   HERO SECTION — 向下捲動提示消失效果
   初學者說明：
   當使用者開始捲動頁面後，向下的箭頭就淡出消失，
   因為它的提示任務已經完成了。
   ============================================================ */
 
// 取得向下捲動提示的元素
var scrollHint = document.querySelector('.hero-scroll-hint');
 
// 監聽整個視窗的捲動事件
// 初學者說明：'scroll' 事件在使用者捲動頁面時就會觸發
window.addEventListener('scroll', function () {
 
  // 取得目前捲動的距離（從頁面頂端算起，單位：像素）
  var scrollY = window.scrollY;
 
  // 如果捲動超過 80px，就讓箭頭淡出
  if (scrollY > 80) {
    // opacity: 0 讓元素透明（視覺消失，但還佔空間）
    // transition 在 CSS 中沒有設定，這裡用 style 直接設定
    scrollHint.style.opacity = '0';
    scrollHint.style.pointerEvents = 'none'; // 同時關閉點擊，避免誤觸
  } else {
    // 捲回頂端時，箭頭再度出現
    scrollHint.style.opacity = '1';
    scrollHint.style.pointerEvents = 'auto';
  }
});
 
 
/* ============================================================
   script.js — 集換式卡片交流展 一頁式網站
   初學者說明：
   - 這個檔案負責所有互動行為（JavaScript 的工作）
   - HTML 負責「結構」、CSS 負責「樣式」、JS 負責「行為」
   - 目前只有 Hero 區的功能，之後每新增一個區塊就在下方繼續補充
   ============================================================ */
 
 
/* ============================================================
   HERO SECTION — 向下捲動提示消失效果
   初學者說明：
   當使用者開始捲動頁面後，向下的箭頭就淡出消失，
   因為它的提示任務已經完成了。
   ============================================================ */
 
// 取得向下捲動提示的元素
var scrollHint = document.querySelector('.hero-scroll-hint');
 
// 監聽整個視窗的捲動事件
// 初學者說明：'scroll' 事件在使用者捲動頁面時就會觸發
window.addEventListener('scroll', function () {
 
  // 取得目前捲動的距離（從頁面頂端算起，單位：像素）
  var scrollY = window.scrollY;
 
  // 如果捲動超過 80px，就讓箭頭淡出
  if (scrollY > 80) {
    // opacity: 0 讓元素透明（視覺消失，但還佔空間）
    // transition 在 CSS 中沒有設定，這裡用 style 直接設定
    scrollHint.style.opacity = '0';
    scrollHint.style.pointerEvents = 'none'; // 同時關閉點擊，避免誤觸
  } else {
    // 捲回頂端時，箭頭再度出現
    scrollHint.style.opacity = '1';
    scrollHint.style.pointerEvents = 'auto';
  }
});
 
 
/* ============================================================
   NAVIGATION BAR — 三個互動功能
   ============================================================ */
 
/* ── 功能 1：捲動時導覽列加上陰影 ──
   初學者說明：
   classList.toggle('is-scrolled', 條件) 的意思是：
   「當條件為 true 時加上 class，條件為 false 時移除 class」
   這比 if/else 寫法更簡潔。
*/
var siteHeader = document.querySelector('.site-header');
 
window.addEventListener('scroll', function () {
  var scrollY = window.scrollY;
 
  // 捲動超過 10px 就加上 is-scrolled，讓導覽列顯示陰影
  siteHeader.classList.toggle('is-scrolled', scrollY > 10);
});
 
 
/* ── 功能 2：手機版漢堡選單開關 ──
   初學者說明：
   點擊漢堡按鈕時，切換手機選單的 is-open class，
   同時把圖示從「三條線」換成「X」，讓使用者知道可以關閉。
*/
var navToggle = document.getElementById('navToggle');
var navMobile = document.getElementById('navMobile');
var navToggleIcon = document.getElementById('navToggleIcon');
 
navToggle.addEventListener('click', function () {
  // toggle 的意思是：有就移除、沒有就加上，每次點擊自動切換
  navMobile.classList.toggle('is-open');
 
  // 根據選單是否開啟，切換圖示
  var isOpen = navMobile.classList.contains('is-open');
  if (isOpen) {
    navToggleIcon.className = 'fa-solid fa-xmark'; // 開啟時顯示 X
  } else {
    navToggleIcon.className = 'fa-solid fa-bars';  // 關閉時顯示三條線
  }
});
 
/* 點擊手機選單的連結後，自動關閉選單 */
var navMobileLinks = document.querySelectorAll('.nav-mobile-link');
 
navMobileLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navMobile.classList.remove('is-open');
    navToggleIcon.className = 'fa-solid fa-bars'; // 圖示回到三條線
  });
});
 
 
/* ── 功能 3：捲動時自動高亮目前所在區塊的連結 ──
   初學者說明：
   IntersectionObserver 是瀏覽器內建的 API，
   可以偵測某個元素是否出現在畫面中（視窗範圍內）。
   比自己用 scroll 事件計算位置更有效率！
*/
var sections = document.querySelectorAll('section[id]'); // 取得所有有 id 的 section
var navLinks = document.querySelectorAll('.nav-link');    // 取得所有導覽連結
 
// 建立觀察器，當 section 進入畫面中間 30% 的範圍時觸發
var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // 找到對應的導覽連結（比對 href 和 section 的 id）
        var activeId = entry.target.id;
 
        navLinks.forEach(function (link) {
          // 移除所有連結的 is-active
          link.classList.remove('is-active');
 
          // 只有 href="#xxx" 符合當前 section id 的連結才加上 is-active
          if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('is-active');
          }
        });
      }
    });
  },
  {
    // rootMargin 設定觸發的邊界：上方縮 20%，下方縮 60%
    // 意思是當 section 進入畫面上方 20% 到下方 40% 之間時才算「進入畫面」
    rootMargin: '-20% 0px -60% 0px'
  }
);
 
// 對每個 section 開始觀察
sections.forEach(function (section) {
  observer.observe(section);
});
 
 
/* ============================================================
   EXHIBITORS SECTION — 攤位篩選功能
   初學者說明：
   點擊篩選按鈕時，讀取按鈕的 data-filter 屬性，
   再比對每張攤位卡片的 data-category 屬性，
   不符合的卡片就加上 is-hidden（CSS 會把它隱藏）。
   ============================================================ */
 
// 取得所有篩選按鈕與攤位卡片
var filterBtns = document.querySelectorAll('.filter-btn');
var exhibitorCards = document.querySelectorAll('.exhibitor-card');
 
filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
 
    // Step 1：把所有按鈕的 is-active 移除，再幫被點擊的按鈕加上
    filterBtns.forEach(function (b) {
      b.classList.remove('is-active');
    });
    btn.classList.add('is-active');
 
    // Step 2：讀取這個按鈕代表的篩選值（例如 "pokemon"、"all"）
    var filter = btn.getAttribute('data-filter');
 
    // Step 3：逐一檢查每張攤位卡片
    exhibitorCards.forEach(function (card) {
 
      // 讀取卡片的分類（例如 "pokemon"、"yugioh"）
      var category = card.getAttribute('data-category');
 
      // 如果篩選值是 "all" 或分類吻合，就顯示；否則隱藏
      if (filter === 'all' || filter === category) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});
 
 
/* ============================================================
   SCHEDULE SECTION — Day 切換 Tab
   初學者說明：
   點擊 Day 1 / Day 2 按鈕時，
   先把所有議程列表隱藏（移除 is-active），
   再找到對應的列表顯示出來（加上 is-active）。
   這個「先全部關掉、再開啟目標」的邏輯很常見，記起來！
   ============================================================ */
 
// 取得所有 Tab 按鈕
var scheduleTabs = document.querySelectorAll('.schedule-tab');
 
scheduleTabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
 
    // Step 1：移除所有 Tab 按鈕的 is-active
    scheduleTabs.forEach(function (t) {
      t.classList.remove('is-active');
    });
 
    // Step 2：幫被點擊的 Tab 加上 is-active
    tab.classList.add('is-active');
 
    // Step 3：讀取 data-day 屬性，知道要顯示哪個議程列表
    var targetDay = tab.getAttribute('data-day'); // 例如 "day1" 或 "day2"
 
    // Step 4：隱藏所有議程列表
    var scheduleLists = document.querySelectorAll('.schedule-list');
    scheduleLists.forEach(function (list) {
      list.classList.remove('is-active');
    });
 
    // Step 5：用 id 找到對應的議程列表並顯示
    var targetList = document.getElementById(targetDay);
    targetList.classList.add('is-active');
  });
});
 
 
/* ============================================================
   CONTACT SECTION — 表單驗證與送出
   初學者說明：
   表單驗證的邏輯是：
   1. 攔截表單的預設送出行為（preventDefault）
   2. 逐一檢查每個欄位是否有填寫
   3. 有錯誤就顯示錯誤訊息，全部通過才模擬送出
 
   這裡的驗證是「前端驗證」，目的是給使用者即時回饋。
   真正的資料保護要在後端（伺服器）再驗證一次。
   ============================================================ */
 
// 取得表單與各欄位
var contactForm = document.getElementById('contactForm');
var nameInput     = document.getElementById('name');
var emailInput    = document.getElementById('email');
var categoryInput = document.getElementById('category');
var messageInput  = document.getElementById('message');
var submitBtn     = document.getElementById('submitBtn');
var formSuccess   = document.getElementById('formSuccess');
 
// 取得各欄位的錯誤訊息容器
var nameError     = document.getElementById('nameError');
var emailError    = document.getElementById('emailError');
var categoryError = document.getElementById('categoryError');
var messageError  = document.getElementById('messageError');
 
 
/* ── 輔助函式：顯示錯誤 ──
   初學者說明：
   把重複的「顯示錯誤」動作寫成一個函式，
   之後要用的時候直接呼叫，不需要重複寫同樣的程式碼。
*/
function showError(input, errorEl, message) {
  input.classList.add('is-error');       // 讓欄位變紅框
  errorEl.textContent = message;         // 顯示錯誤文字
}
 
/* ── 輔助函式：清除錯誤 ── */
function clearError(input, errorEl) {
  input.classList.remove('is-error');    // 移除紅框
  errorEl.textContent = '';             // 清除錯誤文字
}
 
/* ── 輔助函式：驗證 Email 格式 ──
   初學者說明：
   正規表達式（RegExp）是用來比對文字格式的工具。
   這裡的 /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 代表：
   「有 @ 符號、@ 前後都有文字、最後有 .xxx」的格式。
   .test() 會回傳 true（符合）或 false（不符合）。
*/
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
 
 
/* ── 使用者輸入時即時清除錯誤提示 ──
   初學者說明：
   當使用者開始修改欄位內容，馬上清除錯誤訊息，
   給予正向回饋，不讓紅色錯誤一直留在畫面上。
*/
nameInput.addEventListener('input', function () {
  clearError(nameInput, nameError);
});
emailInput.addEventListener('input', function () {
  clearError(emailInput, emailError);
});
messageInput.addEventListener('input', function () {
  clearError(messageInput, messageError);
});
 
 
/* ── 表單送出事件 ── */
contactForm.addEventListener('submit', function (event) {
 
  // 攔截瀏覽器的預設送出行為（預設會跳轉頁面）
  event.preventDefault();
 
  // 用一個變數記錄「目前是否有任何錯誤」
  var hasError = false;
 
  /* ── 驗證姓名 ── */
  // trim() 去掉頭尾空白，避免使用者只輸入空格就過關
  if (nameInput.value.trim() === '') {
    showError(nameInput, nameError, '請輸入姓名');
    hasError = true;
  }
 
  /* ── 驗證 Email ── */
  if (emailInput.value.trim() === '') {
    showError(emailInput, emailError, '請輸入 Email');
    hasError = true;
  } else if (!isValidEmail(emailInput.value.trim())) {
    // 有填寫但格式不對
    showError(emailInput, emailError, 'Email 格式不正確，請重新確認');
    hasError = true;
  }
 
  /* ── 驗證詢問類別 ── */
  if (categoryInput.value === '') {
    showError(categoryInput, categoryError, '請選擇詢問類別');
    hasError = true;
  }
 
  /* ── 驗證訊息內容 ── */
  if (messageInput.value.trim() === '') {
    showError(messageInput, messageError, '請輸入訊息內容');
    hasError = true;
  } else if (messageInput.value.trim().length < 10) {
    // 訊息太短
    showError(messageInput, messageError, '訊息內容至少需要 10 個字');
    hasError = true;
  }
 
  /* ── 如果有任何錯誤，停在這裡不繼續 ── */
  if (hasError) {
    return; // return 讓函式提前結束，不執行下方的送出邏輯
  }
 
  /* ── 所有驗證通過：模擬送出 ──
     初學者說明：
     這裡用 setTimeout 模擬「等待伺服器回應」的過程。
     真實專案中，這裡會改用 fetch() 把資料送到後端 API。
  */
 
  // 讓按鈕進入「送出中」狀態，防止重複點擊
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 送出中…';
 
  // 模擬 1.5 秒的網路等待時間
  setTimeout(function () {
 
    // 顯示成功訊息
    formSuccess.classList.add('is-visible');
 
    // 清空表單所有欄位
    contactForm.reset();
 
    // 讓按鈕恢復可點擊，並還原文字
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> 送出訊息';
 
    // 5 秒後自動隱藏成功訊息
    setTimeout(function () {
      formSuccess.classList.remove('is-visible');
    }, 5000);
 
  }, 1500);
 
});
 
 
/* ============================================================
   頁面捲動回到頂端（回到頂端按鈕）
   初學者說明：
   當使用者捲動超過一個螢幕高度（window.innerHeight）時，
   右下角顯示「回到頂端」的浮動按鈕。
   點擊後用 window.scrollTo 平滑捲回最頂端。
   ============================================================ */
 
// 動態建立「回到頂端」按鈕並加入頁面
var backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTopBtn.setAttribute('aria-label', '回到頂端');
 
// 設定行內樣式（也可以寫在 CSS 裡，這裡為了方便初學者對照）
backToTopBtn.style.cssText = [
  'position: fixed',
  'bottom: 28px',
  'right: 28px',
  'width: 44px',
  'height: 44px',
  'border-radius: 50%',
  'background: var(--color-primary)',
  'color: #fff',
  'border: none',
  'font-size: 16px',
  'cursor: pointer',
  'display: none',           /* 預設隱藏 */
  'align-items: center',
  'justify-content: center',
  'box-shadow: 0 4px 16px rgba(255,107,43,0.40)',
  'transition: transform 0.2s, background 0.2s',
  'z-index: 99'
].join(';');
 
// 把按鈕加到 <body> 最後
document.body.appendChild(backToTopBtn);
 
// 監聽捲動，控制按鈕顯示／隱藏
window.addEventListener('scroll', function () {
  if (window.scrollY > window.innerHeight) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
 
// 點擊後平滑捲回頂端
backToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'  // 平滑捲動
  });
});
 
// 滑鼠移上去放大一點，移開恢復
backToTopBtn.addEventListener('mouseenter', function () {
  backToTopBtn.style.transform = 'scale(1.1)';
});
backToTopBtn.addEventListener('mouseleave', function () {
  backToTopBtn.style.transform = 'scale(1)';
});