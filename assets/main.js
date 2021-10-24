const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};
if(deviceType() == "desktop"){
    if (localStorage.getItem("darkSwitch") == "dark") {
        document.getElementById('title').classList.add('typewriterDark');
    } else if (localStorage.getItem("darkSwitch") == "light") {
        document.getElementById('title').classList.add('typewriter');
    }else{
        document.getElementById('title').classList.add('typewriterDark');
    }
}
