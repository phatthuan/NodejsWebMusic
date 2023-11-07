const bodyNowExtra = document.querySelector(
    ".mobile-player__body-now-extra"
);
const wrapper = document.createElement("div");
wrapper.classList.add("lyrics-wrapper");
let formattedData = "";
wrapper.innerHTML = formattedData;
bodyNowExtra.appendChild(wrapper);
wrapper.classList.add("scrollable");