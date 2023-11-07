async function fetchnghesi() {
  await axios
    .get("http://localhost:3000/api/v1/artists")
    .then((response) => {
      const nghesi = response.data.data.data;
      const gocNhacNgheSiTongQuan = document.querySelector("#gocNhacNgheSiTongQuan");
      const gocNhacNgheSi = document.querySelector("#gocNhacNgheSi");
      const gocNhacNgheSiKhamPha = document.querySelector("#gocNhacNgheSiKhamPha");
      for (let i = 0; i < nghesi.length; i++) {
        const gocNhacNgheSiTongQuanHTML = `
          <li class="option-all__playlist-item option-all__playlist-item-margin_top" >
            <div class="option-all__playlist-item-img-wrapper option-all__playlist-item-img-wrapper-mv">
              <div class="option-all__playlist-item-img-wrapper-action">
                <i class="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
              </div>
              <div class="option-all__playlist-item-img option-all__playlist-item-img-singer" style="background-image: url(${nghesi[i].thumbnail});"></div>
              </div>
            <div class="option-all__playlist-item-content-singer">
              <div class="option-all__playlist-item-content-singer-name1 js__main-color">${nghesi[i].name}</div>
              <div class="option-all__playlist-item-content-singer-name2 js__sub-color">${nghesi[i].totalFollower} quan tâm</div>
              <div class="option-all__playlist-item-content-singer-profile">
                <i class="fas fa-random js__main-color"></i>
                <span class="js__main-color">Góc nhạc</span>
              </div>
            </div>
          </li>`
        const gocNhacNgheSiTongQuanElement = document.createElement("div");
        gocNhacNgheSiTongQuanElement.classList.add("col", "l-2-4", "m-4", "s-6", "mobile-margin-bot-30px")
        gocNhacNgheSiTongQuanElement.innerHTML = gocNhacNgheSiTongQuanHTML;
        gocNhacNgheSiTongQuan.appendChild(gocNhacNgheSiTongQuanElement);



        const gocNhacNgheSiHTML = `
          <li class="option-all__playlist-item option-all__playlist-item-margin_top">
            <div class="option-all__playlist-item-img-wrapper option-all__playlist-item-img-wrapper-mv">
              <div class="option-all__playlist-item-img-wrapper-action">
                <i class="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
              </div>
              <div class="option-all__playlist-item-img option-all__playlist-item-img-singer" style="background-image: url(${nghesi[i].thumbnail});"></div>
            </div>
            <div class="option-all__playlist-item-content-singer">
              <div class="option-all__playlist-item-content-singer-name1 js__main-color">${nghesi[i].name}</div>
              <div class="option-all__playlist-item-content-singer-name2 js__sub-color">${nghesi[i].totalFollower} quan tâm</div>
              <div class="option-all__playlist-item-content-singer-profile">
                <i class="fas fa-random js__main-color"></i>
                <span class="js__main-color">Góc nhạc</span>
              </div>
            </div>
          </li>`
        const gocNhacNgheSiElement = document.createElement("div");
        gocNhacNgheSiElement.classList.add("col", "l-2-4", "m-4", "s-6", "mobile-margin-bot-30px")
        gocNhacNgheSiElement.innerHTML = gocNhacNgheSiHTML;
        gocNhacNgheSi.appendChild(gocNhacNgheSiElement);



        const gocNhacNgheSiKhamPhaHTML = `
          <li class="option-all__playlist-item option-all__playlist-item-margin_top">
            <div class="option-all__playlist-item-img-wrapper option-all__playlist-item-img-wrapper-mv">
              <div class="option-all__playlist-item-img-wrapper-action">
                <i class="fas fa-play option-all__playlist-item-img-wrapper-action-icon2"></i>
              </div>
              <div class="option-all__playlist-item-img option-all__playlist-item-img-singer" style="background-image: url(${nghesi[i].thumbnail});"></div>
            </div>
            <div class="option-all__playlist-item-content-singer">
              <div class="option-all__playlist-item-content-singer-name1 js__main-color">${nghesi[i].name}</div>
              <div class="option-all__playlist-item-content-singer-name2 js__sub-color">${nghesi[i].totalFollower} quan tâm</div>
              <div class="option-all__playlist-item-content-singer-profile">
                <i class="fas fa-random js__main-color"></i>
                <span class="js__main-color">Góc nhạc</span>
              </div>
            </div>
          </li>`
        const gocNhacNgheSiKhamPhaElement = document.createElement("div");
        gocNhacNgheSiKhamPhaElement.classList.add("col", "l-2-4", "m-4", "s-6", "mobile-margin-bot-30px")
        gocNhacNgheSiKhamPhaElement.innerHTML = gocNhacNgheSiKhamPhaHTML;
        gocNhacNgheSiKhamPha.appendChild(gocNhacNgheSiKhamPhaElement);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchnghesi();
