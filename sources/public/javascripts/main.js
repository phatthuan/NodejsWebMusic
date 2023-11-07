const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const optionAllSongList = $('.option-all__songs-list');
const musicNowTym = $('.music-control__left-action-tym-box');
const volumeIcon = $('.music-control__right-volume-icon');
const audio = $('#audio');
const sliderBox = $('.option-all__song-slider');

const playBtn = $('.js__music-control__icon-play');
const thunbPlayerBox = $('.music-control__left');
const progress = $('#progress');
const remainTime = $('.js__music-control__progress-time-start');
const durationTime = $('.js__music-control__progress-time-duration');
const prevBtn = $('.js__music-control__icon2');
const nextBtn = $('.js__music-control__icon4');
const nameSong = $('.music-control__left-content-song');
const nameSinger = $('.music-control__left-content-singer');
const cdThumb = $('.music-control__left-img');
const playAllBtn = $('.js__playall-0');
const playAllBtn1 = $('.js__playall-1');
const randomBtn = $('.js__music-control__icon1');
const repeatBtn = $('.js__music-control__icon5');
const volumeProgress = $('#progress1');
const nextSongHeadding = $('.nextsong__fist');
const nextSongList = $('.nextsong__last-list');
const header = $('.header');
const mainContainer = $('.main-container');
const headerSetting = $('.header__setting');
const headerOverlay = $('.header__right-overlay');
const headerSettingList = $('.header__setting-list');

const themeModal = $('.theme-modal');
const themebtn = $('.header__theme');
const themeClosebtn = $('.theme-modal__close-btn');
const themeOverlay = $('.theme-modal__overlay');
const themeBody = $('.theme-modal__body');
const themeItems = $$('.js-theme-item');
const tabs = $$('.tabs-item');
const panes = $$('.panes-item');
const sideBarTabs = $$('.js__sidebar-tabs');
const containerPanes = $$('.js__container-panes');
const slidersDiscover = $$('.container-discover__slider-item');






var backgroundIndex = 0;




async function home() {
    await axios
        .get("http://localhost:3000/api/v1/songs?sort=-listen&limit=40")
        .then(response => {
            var data
            data = response.data.data.data
            const chuyenSlideTongQuan = document.querySelector("#chuyenSlideTongQuan");
            console.log(data)
            for (let i = 0; i < 4; i++) {
                img = document.createElement('img')
                img.src = data[i].thumbnail
                img.alt = 'anh slider'
                img.classList.add('option-all__song-slider-img')
                if ((i % 3) == 0) {
                    img.classList.add('option-all__song-slider-img-first')
                } else if ((i % 3) == 1) {
                    img.classList.add('option-all__song-slider-img-second')
                } else {
                    img.classList.add('option-all__song-slider-img-third')
                }
                chuyenSlideTongQuan.appendChild(img)
            }
            const sliderItems = $$('.option-all__song-slider-img');
            const app = {
                songsDatatop: [],
                fetchtopbaihat: async function () {
                    await axios
                        .get("http://localhost:3000/api/v1/songs/top100")
                        .then(response => {
                            let data = response.data.data
                            for (let i = 0; i < data.length; i++) {
                                let minutes = Math.floor(data[i].duration / 60)
                                let remainingSeconds = data[i].duration % 60
                                x = {
                                    background: data[i].thumbnail,
                                    name: data[i].title,
                                    singer: data[i].mainArtist,
                                    pathSong: data[i].link,
                                    duration: minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds,
                                    id: data[i].id
                                }
                                this.songsDatatop.push(x)
                            }
                        })
                },
                songsData: [],
                phatbaihat: function () {
                    for (let i = 0; i < data.length; i++) {
                        let minutes = Math.floor(data[i].duration / 60)
                        let remainingSeconds = data[i].duration % 60
                        x = {
                            background: data[i].thumbnail,
                            name: data[i].title,
                            singer: data[i].mainArtist,
                            pathSong: data[i].link,
                            duration: minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds,
                            id: data[i].id,
                            _id: data[i]._id
                        }
                        this.songsData.push(x)
                    }
                },
                // sliderIndex: 0,
                currentIndex: 0,
                currentIndextop: 0,
                isPlaying: false,
                isRandom: false,
                isRepeat: false,
                isMute: false,
                volume: 100,

                defineProperties: function () {
                    Object.defineProperty(this, 'currentSong', {
                        get: function () {
                            return this.songsData[this.currentIndex];
                        }
                    })
                },
                definePropertiestop: function () {
                    Object.defineProperty(this, 'currentSongtop', {
                        get: function () {
                            return this.songsDatatop[this.currentIndextop];
                        }
                    })
                },

                toastSlide: function () {
                    const toatMain = $('#toast');
                    if (toatMain) {
                        const toast = document.createElement('div');
                        toast.classList.add('toast');
                        toast.innerHTML = `
                        <div class="toast__item">
                            <i class="fa-solid fa-circle-exclamation"></i>
                            <span>Chức năng này đang được phát triển, bạn vui lòng thử lại sau !</span>
                        </div>
                    `;
                        toatMain.appendChild(toast);
                        setTimeout(function () {
                            toatMain.removeChild(toast);
                        }, 3000)
                    }
                },

                // THEME APPLY SKIN
                applyTheme: function () {
                    themeItems.forEach((themeItem, index) => {
                        themeItem.onclick = function () {
                            if (index == 0) {
                                backgroundIndex = 0;
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.main').style.backgroundImage = 'url(/images/background-theme/backroundThemes/0.svg)';
                                $('.main-music-control').style.backgroundImage = '';
                                $('.main-music-control').style.backgroundColor = '#37075D';
                                $('.mobile-tab').style.backgroundColor = '#37075D';
                                $('.header__width-search-sub').style.backgroundColor = '#6A39AF';
                                $('.header__width-search-sub').classList.add('header__width-search-sub--purple');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--white');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--green');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--gray');
                                $('.header__width-search').classList.remove('js__gray-backgroundColor');
                                $('.theme-modal__body').style.backgroundColor = '#6A39AF';
                                $('.nextsong__option-wrapper-listplay').style.backgroundColor = '#816399';
                                $('.main-sidebar').style.backgroundColor = 'hsla(0,0%,100%,0.05)';
                                $('.header__width-search-input').classList.remove('header__width-search-input--white');
                                $('.header__width-search-input').classList.add('header__width-search-input--dark');
                                $('.music__option-item.music__option-item--active').style.backgroundColor = "#816399";
                                $('.music__option-item.music__option-item--active').style.color = "#fff";
                                $('.music-control__volume-input').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                                $('.music-control__progress-input').style.backgroundColor = "rgba(255, 255, 255, 0.3)";

                                $$('.js__main-color').forEach((item) => {
                                    item.style.color = '#fff';
                                })
                                $$('.js__sub-color').forEach((item) => {
                                    item.style.color = 'rgba(255, 255, 255, 0.5)';
                                })
                                $$('.js__backgroundColor').forEach((item) => {
                                    item.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                                })
                                $$('.js__border').forEach((item) => {
                                    item.style.border = "2px solid #fff";
                                })
                            } else if (index == 1) {
                                backgroundIndex = 1;
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.main').style.backgroundImage = 'url(/images/background-theme/backroundThemes/1.jpg)';
                                $('.main-music-control').style.backgroundImage = 'none';
                                $('.main-music-control').style.backgroundColor = '#202020';
                                $('.mobile-tab').style.backgroundColor = '#202020';
                                $('.header__width-search-sub').style.backgroundColor = '#3E3E3E';
                                $('.header__width-search-sub').classList.add('header__width-search-sub--gray');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--purple');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--white');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--green');
                                $('.header__width-search').classList.remove('js__gray-backgroundColor');
                                $('.theme-modal__body').style.backgroundColor = '#3D3D3D';
                                $('.nextsong__option-wrapper-listplay').style.backgroundColor = '#787878';
                                $('.main-sidebar').style.backgroundColor = 'hsla(0,0%,100%,0.05)';
                                $('.header__width-search-input').classList.remove('header__width-search-input--white');
                                $('.header__width-search-input').classList.add('header__width-search-input--dark');
                                $('.music__option-item.music__option-item--active').style.backgroundColor = "#787878";
                                $('.music__option-item.music__option-item--active').style.color = "#fff";
                                $('.music-control__volume-input').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                                $('.music-control__progress-input').style.backgroundColor = "rgba(255, 255, 255, 0.3)";

                                $$('.js__main-color').forEach((item) => {
                                    item.style.color = '#fff';
                                })
                                $$('.js__sub-color').forEach((item) => {
                                    item.style.color = 'rgba(255, 255, 255, 0.5)';
                                })
                                $$('.js__backgroundColor').forEach((item) => {
                                    item.style.backgroundColor = "#3E3E3E";
                                })
                                $$('.js__border').forEach((item) => {
                                    item.style.border = "2px solid #fff";
                                })
                            } else if (index == 2) {
                                backgroundIndex = 2;
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.main').style.backgroundImage = 'url(/images/background-theme/backroundThemes/2.jpg)';
                                $('.main-music-control').style.backgroundImage = 'none';
                                $('.main-music-control').style.backgroundColor = '#051740';
                                $('.mobile-tab').style.backgroundColor = '#051740';
                                $('.sidebar__add-playlist').style.backgroundColor = '#132958';
                                $('.sidebar__add-playlist').style.borderTop = '1px solid rgba(0, 0, 0, 0.1)';
                                $('.nextsong__option-wrapper').style.backgroundColor = '#1F3461';
                                $('.header__width-search-sub').style.backgroundColor = '#1F3461';
                                $('.header__width-search-sub').classList.add('header__width-search-sub--green');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--purple');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--white');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--gray');
                                $('.header__width-search').classList.remove('js__gray-backgroundColor');
                                $('.header__setting-list').style.backgroundColor = '#1F3461';
                                $('.theme-modal__body').style.backgroundColor = '#192F60';
                                $('.nextsong__option-wrapper-listplay').style.backgroundColor = '#637191';
                                $('.main-sidebar').style.backgroundColor = 'hsla(0,0%,100%,0.05)';
                                $('.header__width-search-input').classList.remove('header__width-search-input--white');
                                $('.header__width-search-input').classList.add('header__width-search-input--dark');
                                $('.music__option-item.music__option-item--active').style.backgroundColor = "#637191";
                                $('.music__option-item.music__option-item--active').style.color = "#fff";
                                $('.music-control__volume-input').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                                $('.music-control__progress-input').style.backgroundColor = "rgba(255, 255, 255, 0.3)";

                                $$('.js__main-color').forEach((item) => {
                                    item.style.color = '#fff';
                                })
                                $$('.js__sub-color').forEach((item) => {
                                    item.style.color = 'rgba(255, 255, 255, 0.5)';
                                })
                                $$('.js__backgroundColor').forEach((item) => {
                                    item.style.backgroundColor = "#1F3461";
                                })
                                $$('.js__border').forEach((item) => {
                                    item.style.border = "2px solid #fff";
                                })
                            } else if (index == 3) {
                                backgroundIndex = 3;
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.main').style.backgroundImage = 'url(/images/background-theme/backroundThemes/3.jpg)';
                                $('.main-music-control').style.backgroundImage = 'none';
                                $('.main-music-control').style.backgroundColor = '#D0CCC5';
                                $('.mobile-tab').style.backgroundColor = '#D0CCC5';
                                $('.sidebar__add-playlist').style.backgroundColor = '#DAD6D3';
                                $('.sidebar__add-playlist').style.borderTop = '1px solid rgba(0, 0, 0, 0.1)';
                                $('.nextsong__option-wrapper').style.backgroundColor = '#DAD6D3';
                                $('.header__width-search-sub').style.backgroundColor = '#FFFFFE';
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--purple');
                                $('.header__width-search-sub').classList.add('header__width-search-sub--white');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--green');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--gray');
                                $('.header__setting-list').style.backgroundColor = '#FFFFFE';
                                $('.theme-modal__body').style.backgroundColor = '#E6E1DE';
                                $('.nextsong__option-wrapper-listplay').style.backgroundColor = '#E5E2E0';
                                $('.main-sidebar').style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                                $('.header__width-search-input').classList.add('header__width-search-input--white');
                                $('.header__width-search-input').classList.remove('header__width-search-input--dark');
                                $('.music-control__volume-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                                $('.music-control__progress-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";

                                $$('.js__main-color').forEach((item) => {
                                    item.style.color = '#000';
                                })
                                $$('.js__sub-color').forEach((item) => {
                                    item.style.color = '#696969';
                                })
                                $$('.js__backgroundColor').forEach((item) => {
                                    item.style.backgroundColor = "#DAD6D3";
                                })
                                $$('.js__border').forEach((item) => {
                                    item.style.border = "2px solid #000";
                                })
                                $('.music__option-item.music__option-item--active').style.backgroundColor = "#E5E2E0";
                                $('.music__option-item.music__option-item--active').style.color = "#000";
                            } else if (index == 4) {
                                backgroundIndex = 4;
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.main').style.backgroundImage = 'url(/images/background-theme/backroundThemes/4.jpg)';
                                $('.main-music-control').style.backgroundImage = 'none';
                                $('.main-music-control').style.backgroundColor = '#B4D0D0';
                                $('.mobile-tab').style.backgroundColor = '#B4D0D0';
                                $('.sidebar__add-playlist').style.backgroundColor = '#C9E4E6';
                                $('.sidebar__add-playlist').style.borderTop = '1px solid rgba(0, 0, 0, 0.1)';
                                $('.nextsong__option-wrapper').style.backgroundColor = '#C9E4E6';
                                $('.header__width-search-sub').style.backgroundColor = '#FFFFFE';
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--purple');
                                $('.header__width-search-sub').classList.add('header__width-search-sub--white');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--green');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--gray');
                                $('.header__width-search').classList.remove('js__gray-backgroundColor');
                                $('.header__setting-list').style.backgroundColor = '#FFFFFE';
                                $('.theme-modal__body').style.backgroundColor = '#C9E4E6';
                                $('.nextsong__option-wrapper-listplay').style.backgroundColor = '#D9ECEE';
                                $('.main-sidebar').style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                $('.header__width-search-input').classList.add('header__width-search-input--white');
                                $('.header__width-search-input').classList.remove('header__width-search-input--dark');
                                $('.music-control__volume-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                                $('.music-control__progress-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";

                                $$('.js__main-color').forEach((item) => {
                                    item.style.color = '#000';
                                })
                                $$('.js__sub-color').forEach((item) => {
                                    item.style.color = '#696969';
                                })
                                $$('.js__backgroundColor').forEach((item) => {
                                    item.style.backgroundColor = "#C9E4E6";
                                })
                                $$('.js__border').forEach((item) => {
                                    item.style.border = "2px solid #000";
                                })
                                $('.music__option-item.music__option-item--active').style.backgroundColor = "#D9ECEE";
                                $('.music__option-item.music__option-item--active').style.color = "#000";
                            } else if (index == 5) {
                                backgroundIndex = 5;
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.main').style.backgroundImage = 'url(/images/background-theme/backroundThemes/5.jpg)';
                                $('.main-music-control').style.backgroundImage = 'none';
                                $('.main-music-control').style.backgroundColor = '#F9C6C5';
                                $('.mobile-tab').style.backgroundColor = '#F9C6C5';
                                $('.sidebar__add-playlist').style.backgroundColor = '#F6E7E4';
                                $('.sidebar__add-playlist').style.borderTop = '1px solid rgba(0, 0, 0, 0.1)';
                                $('.nextsong__option-wrapper').style.backgroundColor = '#E6D2CD';
                                $('.header__width-search-sub').style.backgroundColor = '#FFFFFE';
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--purple');
                                $('.header__width-search-sub').classList.add('header__width-search-sub--white');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--green');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--gray');
                                $('.header__width-search').classList.remove('js__gray-backgroundColor');
                                $('.header__setting-list').style.backgroundColor = '#FFFFFE';
                                $('.theme-modal__body').style.backgroundColor = '#F9C6C5';
                                $('.nextsong__option-wrapper-listplay').style.backgroundColor = '#EEE0DC';
                                $('.main-sidebar').style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                $('.header__width-search-input').classList.add('header__width-search-input--white');
                                $('.header__width-search-input').classList.remove('header__width-search-input--dark');
                                $('.music__option-item.music__option-item--active').style.backgroundColor = "#EEE0DC";
                                $('.music__option-item.music__option-item--active').style.color = "#000";
                                $('.music-control__volume-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                                $('.music-control__progress-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";

                                $$('.js__main-color').forEach((item) => {
                                    item.style.color = '#000';
                                })
                                $$('.js__sub-color').forEach((item) => {
                                    item.style.color = '#696969';
                                })
                                $$('.js__backgroundColor').forEach((item) => {
                                    item.style.backgroundColor = "#E6D2CD";
                                })
                                $$('.js__border').forEach((item) => {
                                    item.style.border = "2px solid #000";
                                })
                            } else if (index == 6) {
                                backgroundIndex = 6;
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.main').style.backgroundImage = 'url(/images/background-theme/backroundThemes/6.jpg)';
                                $('.main-music-control').style.backgroundImage = 'none';
                                $('.main-music-control').style.backgroundColor = '#C6C4D1';
                                $('.mobile-tab').style.backgroundColor = '#C6C4D1';
                                $('.sidebar__add-playlist').style.backgroundColor = '#B1B0BA';
                                $('.sidebar__add-playlist').style.borderTop = '1px solid rgba(0, 0, 0, 0.1)';
                                $('.nextsong__option-wrapper').style.backgroundColor = '#B1B0BA';
                                $('.header__width-search-sub').style.backgroundColor = '#FFFFFE';
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--purple');
                                $('.header__width-search-sub').classList.add('header__width-search-sub--white');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--green');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--gray');
                                $('.header__width-search').classList.remove('js__gray-backgroundColor');
                                $('.header__setting-list').style.backgroundColor = '#FFFFFE';
                                $('.theme-modal__body').style.backgroundColor = '#E2E7F5';
                                $('.nextsong__option-wrapper-listplay').style.backgroundColor = '#C9C8CF';
                                $('.main-sidebar').style.backgroundColor = 'rgba(0,0,0,0.05)';
                                $('.header__width-search-input').classList.add('header__width-search-input--white');
                                $('.header__width-search-input').classList.remove('header__width-search-input--dark');
                                $('.music__option-item.music__option-item--active').style.backgroundColor = "#C9C8CF";
                                $('.music__option-item.music__option-item--active').style.color = "#000";
                                $('.music-control__volume-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                                $('.music-control__progress-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";

                                $$('.js__main-color').forEach((item) => {
                                    item.style.color = '#000';
                                })
                                $$('.js__sub-color').forEach((item) => {
                                    item.style.color = '#696969';
                                })
                                $$('.js__backgroundColor').forEach((item) => {
                                    item.style.backgroundColor = "#B1B0BA";
                                })
                                $$('.js__border').forEach((item) => {
                                    item.style.border = "2px solid #000";
                                })
                            } else if (index == 7) {
                                backgroundIndex = 7;
                                $('.header').style.backgroundColor = `var(--header-color-${backgroundIndex})`;
                                $('.header').style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
                                $('.main').style.backgroundImage = 'url(/images/background-theme/backroundThemes/7.jpg)';
                                $('.main-music-control').style.backgroundImage = 'none';
                                $('.main-music-control').style.backgroundColor = '#FFFFFF';
                                $('.mobile-tab').style.backgroundColor = '#FFFFFF';
                                $('.sidebar__add-playlist').style.backgroundColor = '#F2F2F2';
                                $('.sidebar__add-playlist').style.borderTop = '1px solid rgba(0, 0, 0, 0.1)';
                                $('.nextsong__option-wrapper').style.backgroundColor = '#F2F2F2';
                                $('.header__width-search-sub').style.backgroundColor = '#FFFFFE';
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--purple');
                                $('.header__width-search-sub').classList.add('header__width-search-sub--white');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--green');
                                $('.header__width-search-sub').classList.remove('header__width-search-sub--gray');
                                $('.header__width-search').classList.remove('js__gray-backgroundColor');
                                $('.header__setting-list').style.backgroundColor = '#FFFFFE';
                                $('.theme-modal__body').style.backgroundColor = '#E6E1DE';
                                $('.nextsong__option-wrapper-listplay').style.backgroundColor = '#FFFFFF';
                                $('.main-sidebar').style.backgroundColor = 'rgba(0,0,0,0.05)';
                                $('.header__width-search-input').classList.add('header__width-search-input--white');
                                $('.header__width-search-input').classList.remove('header__width-search-input--dark');
                                $('.music__option-item.music__option-item--active').style.backgroundColor = "#FFFFFF";
                                $('.music__option-item.music__option-item--active').style.color = "#000";
                                $('.music-control__volume-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                                $('.music-control__progress-input').style.backgroundColor = "rgba(0, 0, 0, 0.3)";

                                $$('.js__main-color').forEach((item) => {
                                    item.style.color = '#000';
                                })
                                $$('.js__sub-color').forEach((item) => {
                                    item.style.color = '#696969';
                                })
                                $$('.js__backgroundColor').forEach((item) => {
                                    item.style.backgroundColor = "#F2F2F2";
                                })
                                $$('.js__border').forEach((item) => {
                                    item.style.border = "2px solid #000";
                                })
                            }

                            app.verifyOptionTextColor();
                        }
                    });
                },

                // RENDER LIST MUSIC ITEM
                renderPlayList: function (playListElement, songsData) {
                    const htmls = songsData.map((song, index) => {
                        return `
                        <!-- songs-item-playing--active-onplay songs-item--active songs-item-playbtn--active -->
                        <li class="songs-item js__song-item0 ${index == this.currentIndex ? 'songs-item--active' : ''} " data-index="${index}">
                            <div class="songs-item-left">
                                <div style="background-image: url(${song.background});" class="songs-item-left-img js__songs-item-left-img-0">
                                    <div class="songs-item-left-img-playbtn"><i class="fas fa-play"></i></div>
                                    <div class="songs-item-left-img-playing-box">
                                        <img class = "songs-item-left-img-playing" src="/images/songs/icon-playing.gif" alt="playing">
                                    </div>
                                </div>
        
                                <div class="songs-item-left-body">
                                    <h3 class="songs-item-left-body-name js__main-color">${song.name}</h3>
                                    <span class="songs-item-left-body-singer js__sub-color">${song.singer}</span>
                                </div>
                            </div>
                            <div class="songs-item-center tablet-hiden mobile-hiden  js__sub-color">
                                <span><button onclick="taixuongbaihat('${song.name}','${song.pathSong}')"><i class="fas fa-upload">Tải xuống</i></button></span>
                            </div>
                            <div class="songs-item-right mobile-hiden ">
                                <span class="songs-item-right-duration js__sub-color">${song.duration}</span>
                            </div>
                        </li>`
                    })
                    playListElement.innerHTML = htmls.join('');
                },

                // RENDER LIST MUSIC ITEM OPTION1
                renderPlayList1: function (playListElement, songsData) {
                    const htmls = songsData.map((song, index) => {
                        return `
                        <!-- songs-item-playing--active-onplay songs-item--active songs-item-playbtn--active -->
                        <li class="songs-item js__song-item1 ${index == this.currentIndex ? 'songs-item--active songs-item-playbtn--active' : ''} " data-index="${index}">
                            <div class="songs-item-left">
                                <div style="background-image: url(${song.background});" class="songs-item-left-img js__songs-item-left-img-1">
                                    <div class="songs-item-left-img-playbtn"><i class="fas fa-play"></i></div>
                                    <div class="songs-item-left-img-playing-box">
                                        <img class = "songs-item-left-img-playing" src="/images/songs/icon-playing.gif" alt="playing">
                                    </div>
                                </div>
        
                                <div class="songs-item-left-body">
                                    <h3 class="songs-item-left-body-name js__main-color">${song.name}</h3>
                                    <span class="songs-item-left-body-singer js__sub-color">${song.singer}</span>
                                </div>
                            </div>
                            <div class="songs-item-center tablet-hiden mobile-hiden js__sub-color">
                                <span>${song.name} (Remix)</span>
                            </div>
                            <div class="songs-item-right mobile-hiden">
                            </div>
                        </li>`
                    })
                    playListElement.innerHTML = htmls.join('');
                },

                // RENDER LIST ZINGCHART
                renderZingChart: function () {
                    const htmls = this.songsDatatop.map((song, index) => {
                        return `
                        <!-- songs-item-playing--active-onplay songs-item--active songs-item-playbtn--active -->
                        <li class="songs-item">
                            <div class="songs-item-left">
                                <span class="zingchart__item-left-stt ${index == 0 ? 'zingchart__item-first' : index == 1 ? 'zingchart__item-second' : index == 2 ? 'zingchart__item-third' : ''}">${index + 1}</span>
                                <span class="zingchart__item-left-line js__main-color">-</span>
                                <div style="background-image: url(${song.background});" class="songs-item-left-img js__songs-item-left-img-bangxephang">
                                    <div class="songs-item-left-img-playbtn"><i class="fas fa-play"></i></div>
                                    <div class="songs-item-left-img-playing-box">
                                        <img class = "songs-item-left-img-playing" src="/images/songs/icon-playing.gif" alt="playing">
                                    </div>
                                </div>
        
                                <div class="songs-item-left-body">
                                    <h3 class="songs-item-left-body-name js__main-color">${song.name}</h3>
                                    <span class="songs-item-left-body-singer js__sub-color">${song.singer}</span>
                                </div>
                            </div>
                            <div class="songs-item-center tablet-hiden mobile-hiden js__sub-color">
                                <span>${song.name} (Remix)</span>
                            </div>
                            <div class="songs-item-right mobile-hiden">
                                <span class="songs-item-right-duration js__sub-color">${song.duration}</span>
                            </div>
                        </li>`
                    })
                    $('.js__zingchart__list').innerHTML = htmls.join('');
                },

                // RENDER HEADDING NEXT SONG 
                renderNextSongHeadding: function (playListElement, songs) {
                    const htmls = this.songsData.map((song, index) => {
                        return index <= this.currentIndex ? `
                    <!-- nextsong__fist-item-headding--active nextsong__fist-item-playbtn--active-->
                    <div class="nextsong__fist-item nextsong__item ${audio.onplay && index == this.currentIndex ? 'nextsong__fist-item-headding--active' : ''} ${index == this.currentIndex ? 'nextsong__fist-item-background--active' : ''}" data-index="${index}">
                        <div class="nextsong__item-img" style="background-image: url(${song.background});">
                            <div class="nextsong__item-playbtn"><i class="fas fa-play"></i></div>
                            <div class="songs-item-left-img-playing-box">
                                <img class = "songs-item-left-img-playing" src="/images/songs/icon-playing.gif" alt="playing">
                            </div>
                        </div>
                        <div class="nextsong__item-body">
                            <span class="nextsong__item-body-heading ${index == this.currentIndex ? '' : 'js__main-color'}">${song.name}</span>
                            <span class="nextsong__item-body-depsc ${index == this.currentIndex ? '' : 'js__sub-color'}">${song.singer}</span>
                        </div>
                        <div class="nextsong__item-action">
                            <span class="nextsong__item-action-dot">
                                <i class="fas fa-ellipsis-h "></i>
                            </span>
                        </div>
                    </div>` : ''
                    })
                    playListElement.innerHTML = htmls.join('');
                },

                // RENDER HEADDING NEXT SONG BAN ĐẦU
                renderNextSongHeaddingStart: function (playListElement, songs) {
                    const htmls = this.songsData.map((song, index) => {
                        return index <= this.currentIndex ? `
                    <!-- nextsong__fist-item-headding--active nextsong__fist-item-playbtn--active-->
                    <div class="nextsong__fist-item nextsong__item nextsong__fist-item-playbtn--active ${audio.onplay && index == this.currentIndex ? 'nextsong__fist-item-headding--active' : ''} ${index == this.currentIndex ? 'nextsong__fist-item-background--active' : ''}" data-index="${index}">
                        <div class="nextsong__item-img" style="background-image: url(${song.background});">
                            <div class="nextsong__item-playbtn"><i class="fas fa-play"></i></div>
                            <div class="songs-item-left-img-playing-box">
                                <img class = "songs-item-left-img-playing" src="/images/songs/icon-playing.gif" alt="playing">
                            </div>
                        </div>
                        <div class="nextsong__item-body">
                            <span class="nextsong__item-body-heading ${index == this.currentIndex ? '' : 'js__main-color'}">${song.name}</span>
                            <span class="nextsong__item-body-depsc ${index == this.currentIndex ? '' : 'js__sub-color'}">${song.singer}</span>
                        </div>
                        <div class="nextsong__item-action">
                            <span class="nextsong__item-action-dot">
                                <i class="fas fa-ellipsis-h "></i>
                            </span>
                        </div>
                    </div>` : ''
                    })
                    playListElement.innerHTML = htmls.join('');
                },

                // RENDER LIST NEXT SONG 
                renderNextSongList: function (playListElement) {
                    if (this.currentIndex >= this.songsData.length - 1) {
                        playListElement.innerHTML = `
                    <span class="nextsong__last-item-end js__sub-color">
                        BẠN ĐÃ NGHE HẾT BÀI RỒI
                    </span>`;
                    } else {
                        const htmls = this.songsData.map((song, index) => {
                            return index > this.currentIndex ? `
                            <li class="nextsong__last-item nextsong__item" data-index="${index}">
                                <div class="nextsong__item-img" style="background-image: url(${song.background});">
                                    <div class="nextsong__item-playbtn"><i class="fas fa-play"></i></div>
                                </div>
                                <div class="nextsong__item-body">
                                    <span class="nextsong__item-body-heading js__main-color">${song.name}</span>
                                    <span class="nextsong__item-body-depsc js__sub-color">${song.singer}</span>
                                </div>
                                <div class="nextsong__item-action">
                                    <span class="nextsong__item-action-dot js__main-color">
                                        <i class="fas fa-ellipsis-h "></i>
                                    </span>
                                </div>
                            </li>` : ''
                        })
                        playListElement.innerHTML = htmls.join('');
                    }

                },

                // RENDER LIST NEXT SONG RANDOM
                renderNextSongListRandom: function (playListElement) {
                    const htmls = `<span class="nextsong__option-random">
                                    Bật chế độ random thì cần gì xem trước bài phát tiếp theo nhể, đỡ phải code :)
                                </span>`
                    playListElement.innerHTML = htmls;
                },



                // KHI ACTIVE KHUẤT THÌ ĐƯA ITEM ACTIVE LÊN VIEW
                scrollToActiveSong: function () {
                    setTimeout(() => {
                        $(".songs-item--active").scrollIntoView({
                            behavior: "smooth",
                            block: "nearest"
                        });
                    }, 300);
                },

                // KHI ACTIVE KHUẤT THÌ ĐƯA NEXT SONG ITEM ACTIVE LÊN VIEW
                scrollToActiveNextSong: function () {
                },

                RandomSong: function () {
                    let newIndex;
                    do {
                        newIndex = Math.floor(Math.random() * this.songsData.length);
                    } while (newIndex === this.currentIndex);

                    this.currentIndex = newIndex;
                    this.loadCurrentSong();
                },

                loadCurrentSong: function () {
                    nameSong.textContent = this.currentSong.name;
                    $('.mobile-player__body-now-name').textContent = this.currentSong.name;
                    nameSinger.textContent = this.currentSong.singer;
                    $('.mobile-player__body-now-singer').textContent = this.currentSong.singer;
                    $('.mobile-player__body-thumb').style.backgroundImage = `url('${this.currentSong.background}')`;
                    $('.music-control__left-img').style.backgroundImage = `url('${this.currentSong.background}')`;
                    localStorage.setItem('baihatdangphat', JSON.stringify(this.currentSong._id))
                    console.log(localStorage.getItem('baihatdangphat'))
                    this.displayDurationTime();
                    audio.src = this.currentSong.pathSong;
                    axios
                        .get(`http://localhost:3000/api/v1/songs/${this.currentSong.id}/lyrics`)
                        .then((response) => {
                            axios
                                .get(response.data.data.file)
                                .then((response) => response.data)
                                .then((data) => {
                                    const lines = data.split("\n");
                                    let formattedData = "";
                                    let lineCount = 0;
                                    lines.forEach((line) => {
                                        if (line.includes("[")) {
                                            formattedData += line.trim() + "<br>";
                                            lineCount++;
                                        } else {
                                            formattedData += line.trim() + " ";
                                        }
                                    });
                                    const bodyNowExtra = document.querySelector(
                                        ".lyrics-wrapper.scrollable"
                                    );
                                    bodyNowExtra.innerHTML = formattedData
                                });
                        })
                        .catch(error =>{
                            let formattedData = "Chưa cập nhật lời bài hát";
                            const bodyNowExtra = document.querySelector(
                                ".lyrics-wrapper.scrollable"
                            );
                            bodyNowExtra.innerHTML = formattedData
                        });
                },

                loadCurrentSongtop: function () {
                    nameSong.textContent = this.currentSongtop.name;
                    $('.mobile-player__body-now-name').textContent = this.currentSongtop.name;
                    nameSinger.textContent = this.currentSongtop.singer;
                    $('.mobile-player__body-now-singer').textContent = this.currentSongtop.singer;
                    $('.mobile-player__body-thumb').style.backgroundImage = `url('${this.currentSongtop.background}')`;
                    $('.music-control__left-img').style.backgroundImage = `url('${this.currentSongtop.background}')`;
                    this.displayDurationTime();
                    audio.src = this.currentSongtop.pathSong;
                    axios
                        .get(`http://localhost:3000/api/v1/songs/${this.currentSongtop.id}/lyrics`)
                        .then((response) => {
                            axios
                                .get(response.data.data.file)
                                .then((response) => response.data)
                                .then((data) => {
                                    const lines = data.split("\n");
                                    let formattedData = "";
                                    let lineCount = 0;
                                    lines.forEach((line) => {
                                        if (line.includes("[")) {
                                            formattedData += line.trim() + "<br>";
                                            lineCount++;
                                        } else {
                                            formattedData += line.trim() + " ";
                                        }
                                    });
                                    const bodyNowExtra = document.querySelector(
                                        ".lyrics-wrapper.scrollable"
                                    );
                                    bodyNowExtra.innerHTML = formattedData
                                });
                        })
                        .catch(error => {
                            let formattedData = "Chưa cập nhật lời bài hát";
                            const bodyNowExtra = document.querySelector(
                                ".lyrics-wrapper.scrollable"
                            );
                            bodyNowExtra.innerHTML = formattedData
                        });
                },

                nextSong: function () {
                    this.currentIndex++;
                    if (this.currentIndex >= this.songsData.length) {
                        this.currentIndex = 0;
                    }
                    this.loadCurrentSong();
                },

                prevSong: function () {
                    this.currentIndex--;
                    if (this.currentIndex < 0) {
                        this.currentIndex = this.songsData.length - 1;
                    }
                    this.loadCurrentSong();
                },

                // ĐỊNH DẠNG LẠI THỜI GIAN
                formatTime: function (number) {
                    const minutes = Math.floor(number / 60);
                    const seconds = Math.floor(number - minutes * 60);
                    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
                },

                // HIỂN THỊ REMAIN TIME TIME VÀO PLAYER
                displayRemainTime: function () {
                    remainTime.textContent = this.formatTime(audio.currentTime);
                    // on mobile
                    $('.mobile-player__ctrl-progress-time-start').textContent = this.formatTime(audio.currentTime);
                },

                // HIỂN THỊ VÀ DURATION TIME VÀO PLAYER
                displayDurationTime: function () {
                    durationTime.textContent = this.currentSong.duration;
                    $('.mobile-player__ctrl-progress-time-duration').textContent = this.currentSong.duration;
                },

                // render next song
                renderNexrSong: function () {
                    this.renderNextSongHeadding(nextSongHeadding, this.songsData);
                    this.renderNextSongList(nextSongList);
                    themeItems[backgroundIndex].click();
                },

                verifyOptionTextColor: function () {
                    $$('.music__option-item').forEach((tab, index) => {
                        if (backgroundIndex === 0 || backgroundIndex === 1 || backgroundIndex === 2) {
                            tab.style.color = '#fff'
                        } else {
                            tab.style.color = '#000'
                        }
                    })
                },

                // SỰ KIỆN VÀ XỬ LÝ
                handleEvents: function () {
                    const _this = this;
                    const songItems = $$('.js__song-item0');
                    const nextSongsItem = $$('.nextsong__item');
                    const playBtnIcons = $$('.js__songs-item-left-img-0');
                    const playNextSongBtnIcons = $$('.nextsong__item-img');
                    const songItemsOption1 = $$('.js__song-item1');
                    const playBtnIconsOption1 = $$('.js__songs-item-left-img-1');
                    const playBtnBangxephang = $$('.js__songs-item-left-img-bangxephang')
                    const nextSongBox = $('.nextsong__box');

                    var sliderIndex = 1;
                    var sliderIndex1 = 1;
                    var sliderLenght = _this.songsData.length;

                    // KHI BẤM VÀO PLAYER ON MOBILE THÌ HIỆN PLAYER TO TRÊN ĐIỆN THOẠI
                    $('.music-control__left').onclick = function () {
                        $('.mobile-player').classList.add('active');
                    }

                    $('.mobile-player__headding-close').onclick = function () {
                        $('.mobile-player').classList.remove('active');
                    }

                    // CHUYỂN TAB CÁ NHÂN / KHÁM PHÁ / ZINGCHART
                    sideBarTabs.forEach((tab, index) => {
                        tab.onclick = function () {
                            $('.js__sidebar-tabs.sidebar__item--active').classList.remove('sidebar__item--active');
                            tab.classList.add('sidebar__item--active');
                            containerPanes[0].style.display = "none";
                            containerPanes[1].style.display = "none";
                            containerPanes[2].style.display = "none";
                            containerPanes[index].style.display = "block";
                        }
                    })

                    // CHUYỂN TAB CÁ NHÂN / KHÁM PHÁ / ZINGCHART TRÊN MOBILE
                    $$('.js__mobile-tab__item').forEach((tab, index) => {
                        tab.onclick = function () {
                            $('.mobile-tab__item.active').classList.remove('active');
                            tab.classList.add('active');
                            containerPanes[0].style.display = "none";
                            containerPanes[1].style.display = "none";
                            containerPanes[2].style.display = "none";
                            containerPanes[index].style.display = "block";
                        }
                    })

                    // chuyển tab option
                    tabs.forEach((tab, index) => {
                        const pane = panes[index];
                        $('.panes-item:not(.music__option-item--active)').style.backgroundColor = 'transparent';
                        themeItems[backgroundIndex].click();
                        _this.verifyOptionTextColor();
                        tab.onclick = function () {
                            $('.music__option-item.music__option-item--active').classList.remove('music__option-item--active');
                            tab.classList.add('music__option-item--active')
                            $('.panes-item.active').classList.remove('active');
                            tabs[0].style.backgroundColor = 'transparent';
                            tabs[1].style.backgroundColor = 'transparent';
                            tabs[2].style.backgroundColor = 'transparent';
                            tabs[3].style.backgroundColor = 'transparent';
                            tab.style.backgroundColor = `var(--option-color-${backgroundIndex})`;
                            pane.classList.add('active')
                            $('.music__option-item.music__option-item--active').classList.remove('js__main-color');
                        }
                    })

                    // khi mới mở web thì sẽ chọn hightlight dòng đầu tiên
                    songItems[this.currentIndex].classList.add('songs-item-playbtn--active');





                    // BẬT TĂT MUTE Ở VOLUME
                    volumeIcon.onclick = function () {
                        _this.isMute = !_this.isMute;
                        volumeIcon.classList.toggle('music-control__right--active', _this.isMute);
                        if (_this.isMute) {
                            audio.volume = 0;
                            volumeProgress.value = 0;
                        } else {
                            audio.volume = _this.volume / 100;
                            volumeProgress.value = _this.volume;
                        }
                    }

                    // TĂNG GIẢM ÂM LƯỢNG
                    volumeProgress.onchange = function (e) {
                        _this.volume = e.target.value;
                        audio.volume = e.target.value / 100;
                        if (e.target.value == 0) {
                            volumeIcon.classList.add('music-control__right--active')
                            _this.isMute = true;
                        } else {
                            volumeIcon.classList.remove('music-control__right--active');
                            _this.isMute = false;
                        }
                    }


                    // XỬ LÝ CD QUAY/DỪNG
                    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
                        duration: 10000, // 10 seconds
                        iterations: Infinity
                    });
                    cdThumbAnimate.pause();

                    // XỬ LÝ CD QUAY/DỪNG TO TRÊN MOBILE
                    const cdThumbAnimateMobile = $('.mobile-player__body-thumb').animate([{ transform: "rotate(360deg)" }], {
                        duration: 10000, // 10 seconds
                        iterations: Infinity
                    });
                    cdThumbAnimateMobile.pause();

                    //   LÀM SLIDER BÊN TAP CÁ NHÂN
                    changeImage = function () {
                        if (sliderLenght <= 1) {
                            return;
                        }
                        let isAllThird = true;
                        sliderItems.forEach((item, index) => {
                            if (index === sliderIndex) {
                                item.classList.replace('option-all__song-slider-img-third', 'option-all__song-slider-img-first');
                                item.classList.replace('option-all__song-slider-img-second', 'option-all__song-slider-img-first');
                            } else if (index === sliderIndex + 1 || (sliderIndex === sliderLenght - 1 && index === 0)) {
                                item.classList.replace('option-all__song-slider-img-first', 'option-all__song-slider-img-second');
                                item.classList.replace('option-all__song-slider-img-third', 'option-all__song-slider-img-second');
                                isAllThird = false;
                            } else {
                                item.classList.replace('option-all__song-slider-img-first', 'option-all__song-slider-img-third');
                                item.classList.replace('option-all__song-slider-img-second', 'option-all__song-slider-img-third');
                                if (item.classList.contains('option-all__song-slider-img-first')) {
                                    isAllThird = false;
                                }
                            }
                        });
                        if (isAllThird) {
                            sliderItems.forEach((item, index) => {
                                if (index === 0) {
                                    item.classList.replace('option-all__song-slider-img-third', 'option-all__song-slider-img-first');
                                } else if (index === 1) {
                                    item.classList.replace('option-all__song-slider-img-third', 'option-all__song-slider-img-second');
                                } else {
                                    item.classList.replace('option-all__song-slider-img-third', 'option-all__song-slider-img-first');
                                }
                            });
                            sliderIndex = 0;
                        } else {
                            sliderIndex++;
                            if (sliderIndex >= sliderLenght) {
                                sliderIndex = 0;
                            }
                        }
                    }
                    setInterval(changeImage, 2000);

                    //   LÀM SLIDER BÊN TAP KHÁM PHÁ
                    changeImage1Replate = function () {
                        slidersDiscover.forEach((item, index) => {
                            if (index == sliderIndex1) {
                                slidersDiscover[index].classList.replace('container-discover__slider-item-second', 'container-discover__slider-item-first');
                                slidersDiscover[index].classList.replace('container-discover__slider-item-third', 'container-discover__slider-item-first');
                                slidersDiscover[index].classList.replace('container-discover__slider-item-four', 'container-discover__slider-item-first');
                            } else if (index == sliderIndex1 + 1) {
                                slidersDiscover[index].classList.replace('container-discover__slider-item-first', 'container-discover__slider-item-second');
                                slidersDiscover[index].classList.replace('container-discover__slider-item-third', 'container-discover__slider-item-second');
                                slidersDiscover[index].classList.replace('container-discover__slider-item-four', 'container-discover__slider-item-second');
                            } else if (index == sliderIndex1 + 2) {
                                slidersDiscover[index].classList.replace('container-discover__slider-item-first', 'container-discover__slider-item-third');
                                slidersDiscover[index].classList.replace('container-discover__slider-item-second', 'container-discover__slider-item-third');
                                slidersDiscover[index].classList.replace('container-discover__slider-item-four', 'container-discover__slider-item-third');
                            } else {
                                slidersDiscover[index].classList.replace('container-discover__slider-item-first', 'container-discover__slider-item-four');
                                slidersDiscover[index].classList.replace('container-discover__slider-item-second', 'container-discover__slider-item-four');
                                slidersDiscover[index].classList.replace('container-discover__slider-item-third', 'container-discover__slider-item-four');
                            }
                            if (sliderIndex1 == 2) {
                                slidersDiscover[0].classList.replace('container-discover__slider-item-first', 'container-discover__slider-item-third');
                                slidersDiscover[0].classList.replace('container-discover__slider-item-second', 'container-discover__slider-item-third');
                                slidersDiscover[0].classList.replace('container-discover__slider-item-four', 'container-discover__slider-item-third');
                            } else if (sliderIndex1 == 3) {
                                slidersDiscover[0].classList.replace('container-discover__slider-item-first', 'container-discover__slider-item-second');
                                slidersDiscover[0].classList.replace('container-discover__slider-item-third', 'container-discover__slider-item-second');
                                slidersDiscover[0].classList.replace('container-discover__slider-item-four', 'container-discover__slider-item-second');
                                slidersDiscover[1].classList.replace('container-discover__slider-item-first', 'container-discover__slider-item-third');
                                slidersDiscover[1].classList.replace('container-discover__slider-item-second', 'container-discover__slider-item-third');
                                slidersDiscover[1].classList.replace('container-discover__slider-item-four', 'container-discover__slider-item-third');
                            }
                        })
                    }
                    changeImage1 = function () {
                        changeImage1Replate();
                        sliderIndex1++;
                        if (sliderIndex1 >= 4) {
                            sliderIndex1 = 0;
                        }
                    }
                    setInterval(changeImage1, 5000);
                    // khi bấm vào nut right của slider
                    $('.js__container-discover__slider-right').onclick = function () {
                        changeImage1();
                    }
                    // khi bấm vào nut left của slider
                    $('.js__container-discover__slider-left').onclick = function () {
                        changeImage1Replate();
                        sliderIndex1--;
                        if (sliderIndex1 < 0) {
                            sliderIndex1 = 3;
                        }
                    }



                    // XỬ LÝ KHI CLICK VÀO NÚT PLAY
                    playBtn.onclick = function () {
                        if (_this.isPlaying) {
                            audio.pause();
                        } else {
                            audio.play();
                        }
                    }

                    // XỬ LÝ KHI CLICK VÀO NÚT PLAY ON MOBILE
                    $('.js__mobile-player__ctrl-icon').onclick = function () {
                        if (_this.isPlaying) {
                            audio.pause();
                        } else {
                            audio.play();
                        }
                    }

                    // Khi song được play
                    audio.onplay = function () {
                        const nextSongsItemHeadding = $$('.nextsong__fist-item');

                        _this.isPlaying = true;
                        // player.classList.add("playing");
                        cdThumbAnimate.play();
                        cdThumbAnimateMobile.play();
                        playBtn.classList.add('music-control__icon-play--active');
                        $('.js__mobile-player__ctrl-icon').classList.add('music-control__icon-play--active');
                        thunbPlayerBox.style.transform = "translateX(20px)";

                        songItems[_this.currentIndex].classList.add('songs-item-playing--active-onplay');
                        songItems[_this.currentIndex].classList.add('songs-item--active');
                        songItems[_this.currentIndex].classList.remove('songs-item-playbtn--active');

                        songItemsOption1[_this.currentIndex].classList.add('songs-item-playing--active-onplay');
                        songItemsOption1[_this.currentIndex].classList.add('songs-item--active');
                        songItemsOption1[_this.currentIndex].classList.remove('songs-item-playbtn--active');

                        // songItemsOption1[_this.currentIndex].classList.add('songs-item-playing--active-onplay');

                        const nextSongItems = $$('.nextsong__item')
                        nextSongItems[_this.currentIndex].classList.add('nextsong__fist-item-headding--active');
                        nextSongItems[_this.currentIndex].classList.remove('nextsong__fist-item-playbtn--active');
                    };

                    // KHI SONG BỊ PAUSE
                    audio.onpause = function () {
                        _this.isPlaying = false;
                        cdThumbAnimate.pause();
                        cdThumbAnimateMobile.pause();
                        playBtn.classList.remove('music-control__icon-play--active');
                        $('.js__mobile-player__ctrl-icon').classList.remove('music-control__icon-play--active');
                        thunbPlayerBox.style.transform = "translateX(0)";
                        songItems[_this.currentIndex].classList.remove('songs-item-playing--active-onplay');
                        songItems[_this.currentIndex].classList.add('songs-item-playbtn--active');
                        songItemsOption1[_this.currentIndex].classList.remove('songs-item-playing--active-onplay');
                        songItemsOption1[_this.currentIndex].classList.add('songs-item-playbtn--active');
                        const nextSongItems = $$('.nextsong__item')
                        nextSongItems[_this.currentIndex].classList.remove('nextsong__fist-item-headding--active');
                        nextSongItems[_this.currentIndex].classList.add('nextsong__fist-item-playbtn--active');
                    }

                    // KHI TIẾN ĐỘ BÀI HÁT THAY ĐỔI
                    audio.ontimeupdate = function () {
                        if (audio.duration) {
                            const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                            progress.value = progressPercent;
                            // on mobile
                            $('#progress2').value = progressPercent;
                        }
                        _this.displayRemainTime();
                    }

                    // KHI TUA SONG
                    progress.onchange = function (e) {
                        const seekTime = (audio.duration / 100) * e.target.value;
                        audio.currentTime = seekTime;
                    }
                    // KHI TUA SONG ON MOBILE
                    $('#progress2').onchange = function (e) {
                        const seekTime = (audio.duration / 100) * e.target.value;
                        audio.currentTime = seekTime;
                    }

                    // XOÁ CÁC THUỘC TÍNH KHI ACTIVE CŨ
                    deleteActive = function () {
                        songItems.forEach((songItem, index) => {
                            songItem.classList.remove('songs-item-playing--active-onplay');
                            songItem.classList.remove('songs-item--active');
                            songItem.classList.remove('songs-item-playbtn--active');
                        });
                    }

                    deleteActive1 = function () {
                        songItemsOption1.forEach((songItem, index) => {
                            songItem.classList.remove('songs-item-playing--active-onplay');
                            songItem.classList.remove('songs-item--active');
                            songItem.classList.remove('songs-item-playbtn--active');
                        });
                    }


                    // KHI NEXT SONG
                    nextBtn.onclick = function () {
                        if (_this.isRandom) {
                            _this.RandomSong();
                            // không render list next song
                            _this.renderNextSongHeadding(nextSongHeadding, this.songsData);
                            nextSongList.innerHTML = ``;
                        } else {
                            _this.nextSong();
                            _this.renderNexrSong();
                        }
                        audio.play();
                        _this.scrollToActiveNextSong();
                        _this.scrollToActiveSong();
                        deleteActive();
                        deleteActive1();
                    }

                    // KHI NEXT SONG ON MOBILE
                    $('.js__mobile-player__ctrl-icon4').onclick = function () {
                        if (_this.isRandom) {
                            _this.RandomSong();
                            // không render list next song
                            _this.renderNextSongHeadding(nextSongHeadding, this.songsData);
                            nextSongList.innerHTML = `
                            <span class="nextsong__last-item-end">
                                Bật chế độ random thì cần gì xem trước bài phát tiếp theo nhể, đỡ phải code :)
                            </span>`;
                        } else {
                            _this.nextSong();
                            _this.renderNexrSong();
                        }
                        audio.play();
                        _this.scrollToActiveNextSong();
                        _this.scrollToActiveSong();
                        deleteActive();
                        deleteActive1();
                    }

                    // KHI PREV SONG
                    prevBtn.onclick = function () {
                        if (_this.isRandom) {
                            _this.RandomSong();
                            // không render list next song
                            _this.renderNextSongHeadding(nextSongHeadding, this.songsData);
                            nextSongList.innerHTML = `
                            <span class="nextsong__last-item-end">
                                Bật chế độ random thì cần gì xem trước bài phát tiếp theo nhể, đỡ phải code :)
                            </span>`;
                            _this.scrollToActiveNextSong();
                        } else {
                            _this.prevSong();
                            _this.renderNexrSong();
                            _this.scrollToActiveNextSong();
                        }
                        audio.play();
                        deleteActive();
                        deleteActive1();
                        _this.scrollToActiveSong();
                    }

                    // KHI PREV SONG ON MOBILE
                    $('.js__mobile-player__ctrl-icon2').onclick = function () {
                        if (_this.isRandom) {
                            _this.RandomSong();
                            // không render list next song
                            _this.renderNextSongHeadding(nextSongHeadding, this.songsData);
                            nextSongList.innerHTML = `
                            <span class="nextsong__last-item-end">
                                Bật chế độ random thì cần gì xem trước bài phát tiếp theo nhể, đỡ phải code :)
                            </span>`;
                            _this.scrollToActiveNextSong();
                        } else {
                            _this.prevSong();
                            _this.renderNexrSong();
                            _this.scrollToActiveNextSong();
                        }
                        audio.play();
                        deleteActive();
                        deleteActive1();
                        _this.scrollToActiveSong();
                    }

                    // KHI BAM VÀO NÚT PHÁT TẤT CẢ OPTION-0
                    playAllBtn.onclick = function () {
                        _this.currentIndex = 0;
                        _this.loadCurrentSong();
                        audio.play();
                        deleteActive();
                        _this.scrollToActiveSong();
                        if (_this.isRandom) {
                            _this.renderNextSongHeadding(nextSongHeadding, _this.songsData);
                            nextSongList.innerHTML = `
                            <span class="nextsong__last-item-end">
                                Bật chế độ random thì cần gì xem trước bài phát tiếp theo nhể, đỡ phải code :)
                            </span>`;
                        } else {
                            _this.renderNexrSong();
                            // setTimeout(_this.scrollToActiveNextSong(), 2000);
                            _this.scrollToActiveNextSong();
                        }
                    }

                    // KHI BAM VÀO NÚT PHÁT TẤT CẢ OPTION-1
                    playAllBtn1.onclick = function () {
                        _this.currentIndex = 0;
                        _this.loadCurrentSong();
                        audio.play();
                        deleteActive();
                        deleteActive1();
                        _this.scrollToActiveSong();
                        if (_this.isRandom) {
                            _this.renderNextSongHeadding(nextSongHeadding, _this.songsData);
                            nextSongList.innerHTML = `
                            <span class="nextsong__last-item-end">
                                Bật chế độ random thì cần gì xem trước bài phát tiếp theo nhể, đỡ phải code :)
                            </span>`;
                        } else {
                            _this.renderNexrSong();
                            // setTimeout(_this.scrollToActiveNextSong(), 2000);
                            _this.scrollToActiveNextSong();
                        }
                    }

                    // KHI BẤM VÀO NÚT PLAY Ở THUMB BÀI BÁT Ở PHẦN TỔNG QUAN
                    playBtnIcons.forEach((playBtnIcon, index) => {
                        playBtnIcon.onclick = function () {
                            if (_this.isPlaying && _this.currentIndex == index) {
                                audio.pause();
                            } else if (!_this.isPlaying && _this.currentIndex == index) {
                                audio.play();
                            } else if (_this.currentIndex != index) {
                                _this.currentIndex = index;
                                _this.loadCurrentSong();
                                audio.play();
                                deleteActive();
                                deleteActive1();
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                            if (_this.isRandom) {
                                _this.renderNextSongHeadding(nextSongHeadding, _this.songsData);
                                nextSongList.innerHTML = ``;
                            } else if (!_this.isRandom && _this.currentIndex >= _this.songsData.length - 1) {
                                $('.nextsong__last-item-end').textContent = 'BẠN ĐÃ NGHE HẾT BÀI RỒI';
                            } else {
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                        }
                    });

                    // KHI BẤM VÀO NÚT PLAY Ở THUMB BÀI BÁT Ở PHẦN MUSIC OPTION1
                    playBtnIconsOption1.forEach((item, index) => {
                        item.onclick = function () {
                            if (_this.isPlaying && _this.currentIndex == index) {
                                audio.pause();
                            } else if (!_this.isPlaying && _this.currentIndex == index) {
                                audio.play();
                            } else if (_this.currentIndex != index) {
                                _this.currentIndex = index;
                                _this.loadCurrentSong();
                                audio.play();
                                deleteActive();
                                deleteActive1();
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                            if (_this.isRandom) {
                                _this.renderNextSongHeadding(nextSongHeadding, _this.songsData);
                                nextSongList.innerHTML = ``;
                            } else if (!_this.isRandom && _this.currentIndex >= _this.songsData.length - 1) {
                                $('.nextsong__last-item-end').textContent = 'BẠN ĐÃ NGHE HẾT BÀI RỒI';
                            } else {
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                        }
                    })

                    playBtnBangxephang.forEach((item, index) => {
                        item.onclick = function () {
                            if (_this.isPlaying && _this.currentIndextop == index) {
                                audio.pause();
                            } else if (!_this.isPlaying && _this.currentIndextop == index) {
                                audio.play();
                            } else if (_this.currentIndextop != index) {
                                _this.currentIndextop = index;
                                _this.loadCurrentSongtop();
                                audio.play();
                                deleteActive();
                                deleteActive1();
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                            if (_this.isRandom) {
                                _this.renderNextSongHeadding(nextSongHeadding, _this.songsDatatop);
                                nextSongList.innerHTML = ``;
                            } else {
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                        }
                    })

                    // KHI CLICK VÀO NEXT SONG BOX
                    nextSongBox.onclick = function (e) {
                        const songNode = e.target.closest(".nextsong__item");
                        if (songNode) {
                            if (e.target.closest(".nextsong__item-img")) {
                                if (_this.isPlaying && Number(songNode.dataset.index) == _this.currentIndex) {
                                    audio.pause();
                                    _this.isPlaying = false;
                                    songNode.classList.remove('nextsong__fist-item-headding--active');
                                } else if (!_this.isPlaying && Number(songNode.dataset.index) == _this.currentIndex) {
                                    audio.play();
                                    _this.isPlaying = true;
                                    songNode.classList.add('nextsong__fist-item-headding--active');

                                } else if (Number(songNode.dataset.index) != _this.currentIndex) {
                                    _this.currentIndex = Number(songNode.dataset.index);
                                    _this.loadCurrentSong();
                                    _this.renderNexrSong();
                                    deleteActive();
                                    _this.scrollToActiveSong();
                                    audio.play();
                                    _this.isPlaying = true;
                                    const nextSongItems = $$('.nextsong__item')
                                    nextSongItems[_this.currentIndex].classList.add('nextsong__fist-item-headding--active');
                                }
                            }
                        }
                    };

                    // KHI CLICK DUP VÀO NEXT SONG BOX
                    nextSongBox.ondblclick = function (e) {
                        const songNode = e.target.closest(".nextsong__item:not(.nextsong__fist-item-headding--active)");
                        if (songNode) {
                            if (_this.isPlaying && Number(songNode.dataset.index) == _this.currentIndex) {
                                audio.pause();
                                _this.isPlaying = false;
                                songNode.classList.remove('nextsong__fist-item-headding--active');
                            } else if (!_this.isPlaying && Number(songNode.dataset.index) == _this.currentIndex) {
                                audio.play();
                                _this.isPlaying = true;
                                songNode.classList.add('nextsong__fist-item-headding--active');

                            } else if (Number(songNode.dataset.index) != _this.currentIndex) {
                                _this.currentIndex = Number(songNode.dataset.index);
                                _this.loadCurrentSong();
                                _this.renderNexrSong();
                                deleteActive();
                                _this.scrollToActiveSong();
                                audio.play();
                                _this.isPlaying = true;
                                const nextSongItems = $$('.nextsong__item')
                                nextSongItems[_this.currentIndex].classList.add('nextsong__fist-item-headding--active');
                            }
                        }
                    };

                    // KHI BẬT NÚT CHẠY RANDOM
                    randomBtn.onclick = function () {
                        _this.isRandom = !_this.isRandom;
                        _this.isRepeat = false;
                        randomBtn.classList.toggle("music-control__icon-random--active", _this.isRandom);
                        if (_this.isRandom) {
                            randomBtn.style.color = 'var(--primary-color)';
                        } else {
                            randomBtn.style.color = '#fff';
                        }
                        repeatBtn.classList.toggle("music-control__icon-repeat--active", _this.isRepeat);

                        if (_this.isRandom) {
                            _this.renderNextSongHeadding(nextSongHeadding, _this.songsData);
                            nextSongList.innerHTML = ``;
                        } else {
                            if (_this.currentIndex >= _this.songsData.length - 1) {
                                $('.nextsong__last-item-end').textContent = 'BẠN ĐÃ NGHE HẾT BÀI RỒI';
                            } else {
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                        }
                    }

                    // KHI BẬT NÚT CHẠY RANDOM ON MOBILE
                    $('.js__mobile-player__ctrl-icon1').onclick = function () {
                        _this.isRandom = !_this.isRandom;
                        _this.isRepeat = false;
                        randomBtn.classList.toggle("music-control__icon-random--active", _this.isRandom);
                        $('.js__mobile-player__ctrl-icon1').classList.toggle("music-control__icon-random--active", _this.isRandom);
                        if (_this.isRandom) {
                            randomBtn.style.color = 'var(--primary-color)';
                        } else {
                            randomBtn.style.color = '#fff';
                        }
                        $('.js__mobile-player__ctrl-icon5').classList.toggle("music-control__icon-repeat--active", _this.isRepeat);

                        if (_this.isRandom) {
                            _this.renderNextSongHeadding(nextSongHeadding, _this.songsData);
                            nextSongList.innerHTML = ``;
                        } else {
                            if (_this.currentIndex >= _this.songsData.length - 1) {
                                $('.nextsong__last-item-end').textContent = 'BẠN ĐÃ NGHE HẾT BÀI RỒI';
                            } else {
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                        }
                    }

                    // KHI BẬT NÚT CHẠY REPEAT
                    repeatBtn.onclick = function () {
                        _this.isRepeat = !_this.isRepeat;
                        _this.isRandom = false;
                        // _this.setConfig("isRepeat", _this.isRepeat);
                        repeatBtn.classList.toggle("music-control__icon-repeat--active", _this.isRepeat);
                        repeatBtn.style.color = 'var(--primary-color)';
                        randomBtn.classList.toggle("music-control__icon-random--active", _this.isRandom);
                        _this.renderNexrSong();
                        _this.scrollToActiveNextSong();
                    }

                    // KHI BẬT NÚT CHẠY REPEAT ON MOBILE
                    $('.js__mobile-player__ctrl-icon5').onclick = function () {
                        _this.isRepeat = !_this.isRepeat;
                        _this.isRandom = false;
                        // _this.setConfig("isRepeat", _this.isRepeat);
                        $('.js__mobile-player__ctrl-icon5').classList.toggle("music-control__icon-repeat--active", _this.isRepeat);
                        // $('.js__mobile-player__ctrl-icon5').style.color = 'var(--primary-color)';
                        $('.js__mobile-player__ctrl-icon1').classList.toggle("music-control__icon-random--active", _this.isRandom);
                        _this.renderNexrSong();
                        _this.scrollToActiveNextSong();
                    }

                    // XỬ LÝ KHI AUDIO KẾT THÚC
                    audio.onended = function () {
                        if (_this.isRepeat) {
                            audio.play();
                        } else {
                            nextBtn.click();
                            _this.renderNexrSong();
                            _this.scrollToActiveNextSong();
                        }
                    };

                    // KHI CLICK DUP VÀO BÀI NHẠC THÌ PHÁT NHẠC
                    songItems.forEach((songItem, index) => {
                        songItem.ondblclick = function () {
                            _this.currentIndex = index;
                            _this.loadCurrentSong();
                            deleteActive();
                            deleteActive1();
                            audio.play();

                            if (_this.isRandom) {
                                // không render next song list
                                _this.renderNextSongHeadding(nextSongHeadding, _this.songsData);
                            } else {
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                        }

                    })

                    // KHI CLICK DUP VÀO BÀI NHẠC THÌ PHÁT NHẠC
                    songItemsOption1.forEach((songItem, index) => {
                        songItem.ondblclick = function () {
                            _this.currentIndex = index;
                            _this.loadCurrentSong();
                            deleteActive();
                            deleteActive1();
                            audio.play();

                            if (_this.isRandom) {
                                // không render next song list
                                _this.renderNextSongHeadding(nextSongHeadding, _this.songsData);
                            } else {
                                _this.renderNexrSong();
                                _this.scrollToActiveNextSong();
                            }
                        }

                    })

                    // CUỘN LÊN THÌ LÀM TRONG THANH HEADER
                    mainContainer.onscroll = function () {
                        scrollTop = mainContainer.scrollY || mainContainer.scrollTop
                        // if (scrollTop > 50) {
                        //     header.classList.toggle('header--active');
                        // }

                        // làm cách này mà ko làm cách trên để tránh bị gật lag 
                        if (scrollTop > 5) {
                            Object.assign(header.style, {
                                backgroundColor: `var(--header-color-${backgroundIndex})`,
                                boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
                            })
                        } else {
                            Object.assign(header.style, {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            })
                        }
                    };

                    // THEME MODAL
                    themebtn.onclick = function () {
                        themeModal.classList.toggle('theme-modal--avtive');
                    }
                    themeBody.onclick = function (e) {
                        e.stopPropagation();
                    }
                    themeClosebtn.onclick = function () {
                        themeModal.classList.remove('theme-modal--avtive');
                    }
                    themeOverlay.onclick = function () {
                        themeModal.classList.remove('theme-modal--avtive');
                    }

                    // TOAST
                    $$('.js__toast').forEach((item, index) => {
                        item.onclick = function () {
                            _this.toastSlide();
                        }
                    })






                },


                //=================================================================
                start: async function () {
                    //khoitaobaihat
                    await this.phatbaihat();
                    await this.fetchtopbaihat()
                    // render ra danh sách nhạc ở phần tổng quan
                    this.renderPlayList(optionAllSongList, this.songsData);
                    // render ra danh sách nhạc ở phần tab music
                    this.renderPlayList1($('.option-music-list'), this.songsData);
                    // render next song
                    this.renderNexrSong();
                    // render next song start
                    this.renderNextSongHeaddingStart(nextSongHeadding, this.songsData);
                    // render zingchart
                    this.renderZingChart()



                    // Define các thuộc tính cho object
                    this.defineProperties();
                    this.definePropertiestop();

                    // xử lý và sự kiện
                    this.handleEvents();

                    // hiển thị thời gian chạy và thời lượng của audio hiện tại
                    this.displayDurationTime();

                    // theme
                    this.applyTheme();

                    this.loadCurrentSong();
                }

            }
            app.start();
        })
        .catch(error => {
            console.log(error)
        })
}
home()

document.addEventListener("DOMContentLoaded", async function () {
    await confirmLogin()
});

async function confirmLogin() {
    const headerRightDiv = document.querySelector('.header__right');
    const profile = document.querySelector('.profile');
    const header__setting = document.querySelector('.header__setting');
    const header__user = document.querySelector('.header__user');

    if (localStorage.getItem('user')) {
        var user = JSON.parse(localStorage.getItem('user'))
        const name_user = user.user.name
        console.log(user)

        const content_profile = `<a href="#">
                                    <img src="data:image/png;base64,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" alt="avata" class="profile__img">
                                </a>
                                <span class="profile__name js__main-color">${name_user}</span>`;

        // Tạo icon người dùng
        const userLink = document.createElement('a');
        userLink.href = '#';

        const userImg = document.createElement('img');
        userImg.src = 'data:image/png;base64,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';
        userImg.alt = 'user';
        userImg.classList.add('header__user-img');

        userLink.appendChild(userImg);

        // Xóa header user cũ
        while (header__user.firstChild) {
            header__user.removeChild(header__user.firstChild);
        }

        // Tạo nút logout
        const logoutButton = document.createElement('button');
        logoutButton.setAttribute('type', 'button');
        logoutButton.setAttribute('id', 'logoutButton');
        logoutButton.textContent = 'Logout';

        // Add CSS styles to button
        logoutButton.style.backgroundColor = '#ed2b91';
        logoutButton.style.border = 'none';
        logoutButton.style.color = 'white';
        logoutButton.style.padding = '0 20px';
        logoutButton.style.height = '40px';
        logoutButton.style.fontSize = '1.4rem';
        logoutButton.style.display = 'flex';
        logoutButton.style.alignItems = 'center';
        logoutButton.style.justifyContent = 'center';
        logoutButton.style.borderRadius = '13px';
        logoutButton.style.fontWeight = '300';
        logoutButton.style.cursor = 'pointer';
        logoutButton.style.textTransform = 'uppercase';
        logoutButton.style.marginLeft = '14px';

        // Add click event listener to logout button
        logoutButton.addEventListener('click', async function () {
            // Clear local storage for user
            console.log("logout")
            localStorage.removeItem('user')

            const message_logout = await logout()
            console.log(message_logout)

            window.location.href = "/"
        });

        // Thêm nút logout vào chỗ header right
        headerRightDiv.appendChild(logoutButton);

        // Thêm vào chỗ profile
        profile.innerHTML = content_profile;

        // Thêm vào chỗ header right
        header__user.appendChild(userLink);

    } else {
        console.log("Not login")

        // Xóa các profile đi
        header__user.remove()

        // Tạo nút login
        const loginButton = document.createElement('button');
        loginButton.setAttribute('type', 'button');
        loginButton.setAttribute('id', 'loginButton');
        loginButton.textContent = 'Login';

        // Add CSS styles to button
        loginButton.style.backgroundColor = '#ed2b91';
        loginButton.style.border = 'none';
        loginButton.style.color = 'white';
        loginButton.style.padding = '0 20px';
        loginButton.style.height = '40px';
        loginButton.style.fontSize = '1.4rem';
        loginButton.style.display = 'flex';
        loginButton.style.alignItems = 'center';
        loginButton.style.justifyContent = 'center';
        loginButton.style.borderRadius = '13px';
        loginButton.style.fontWeight = '300';
        loginButton.style.cursor = 'pointer';
        loginButton.style.textTransform = 'uppercase';
        loginButton.style.marginLeft = '14px';

        // Thêm nút login
        headerRightDiv.appendChild(loginButton);

        // Thêm sự kiện click login
        loginButton.addEventListener('click', function () {
            window.location.href = "/login"
        });
    }
}

async function logout() {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/logout")
        const data = response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

function taixuongbaihat(name, url) {
    // Đường dẫn đến file nhạc cần tải
    var musicUrl = url;

    // Tải file nhạc và tạo đối tượng Blob
    fetch(musicUrl)
        .then(response => response.blob())
        .then(blob => {
            // Tạo đường dẫn URL cho đối tượng Blob
            var url = URL.createObjectURL(blob);

            // Tạo thẻ a với thuộc tính href trỏ đến đường dẫn URL
            var link = document.createElement('a');
            link.href = url;

            // Đặt tên cho file khi tải về
            link.download = name+'.mp3';

            // Giả lập một sự kiện click và kích hoạt sự kiện này
            var clickEvent = new MouseEvent('click');
            link.dispatchEvent(clickEvent);
        });
}















