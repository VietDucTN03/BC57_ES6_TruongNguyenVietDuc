// Lưu thông tin 
let items = {
  topclothes: null,
  botclothes: null,
  shoes: null,
  handbags: null,
  necklaces: null,
  hairstyle: null,
  background: null,
};

// Menu
function Menu() {
  const promise = axios({
    url: "/data/Data.json",
    method: "GET",
  });
  promise.then(function (res) {
    console.log(res);
    const menuBar = res.data.navPills;
    if (menuBar.length > 0) {
      displayMenu(menuBar);
      showContent('topclothes');
    }
  });
  promise.catch(function (err) {
    console.log(err);
  });
}
Menu();

// Display Menu
function displayMenu(menuBar) {
  const tabMenu = document.querySelector("#tab-menu");
  let htmlString = `<table border="1" class="tbl-content"><tbody class="t-body">`;
  menuBar.forEach(function (pill) {
    htmlString += `<tr><td class="tab-cell" id="${pill.type}" onclick="showContent('${pill.type}')">${pill.showName}</td></tr>`;
  });
  htmlString += `</tbody></table>`;
  tabMenu.innerHTML = htmlString;
}

// Show Content
function showContent(type) {
  const promise = axios({
    url: "/data/Data.json",
    method: "GET",
  });
  promise.then(function (res) {
    const products = res.data.tabPanes.filter(function (pane) {
      return pane.type === type;
    });
    const tabContent = document.querySelector("#tab-content");
    let htmlString = '<table class="tbl-content"><tbody class="row">';
    products.forEach(function (item) {
      htmlString += `
                <tr class="product">
                    <td class="img">
                        <img src="${item.imgSrc_jpg}" alt="${item.name}" class="img-product"/>
                    </td>
                    <td class="text-name">${item.name}</td>
                    <td class="button">
                        <button onclick="testProduct('${item.type}', '${item.imgSrc_png}')" class="btn-test">Thử đồ</button>
                    </td>
                </tr>`;
    });
    htmlString += "</tbody></table>";
    tabContent.innerHTML = htmlString;
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

// Thử đồ
function testProduct(type, imgSrc) {
  items[type] = imgSrc;
  renderOutfit();
}

// Hàm hiển thị trang phục đã chọn
function renderOutfit() {
  const shirt = document.querySelector("#test-topclothes");
  const dress = document.querySelector("#test-botclothes");
  const hairstyle = document.querySelector("#test-hairstyle");
  const necklace = document.querySelector("#test-necklace");
  const handbag = document.querySelector("#test-handbag");
  const shoes = document.querySelector("#test-feet");
  const background = document.querySelector("#test-bg");

  const renderImg = function (e, items, alt) {
    if (items) {
      e.innerHTML = `<img src="${items}" alt="${alt}" class="img-test"/>`;
    } else {
      e.innerHTML = "";
    }
  };

  renderImg(shirt, items.topclothes, "Top Clothes");
  renderImg(dress, items.botclothes, "Bottom Clothes");
  renderImg(shoes, items.shoes, "Shoes");
  renderImg(handbag, items.handbags, "Handbag");
  renderImg(necklace, items.necklaces, "Necklace");
  renderImg(hairstyle, items.hairstyle, "Hairstyle");

  if (items.background) {
    background.style.backgroundImage = `url(${items.background})`;
  } else {
    background.style.backgroundImage = "";
  }
}

