function setDark() {
    $("#darkSwitch").prop("checked", true);
    $('.navbar').addClass('navbar-dark').removeClass('navbar-light');
    $('.text-muted').addClass('text-white').removeClass('text-muted');
    $('.card').addClass('bg-transparent').addClass('border-light');
    $('footer').addClass('bg-dark').addClass('bg-opacity-50').removeClass('bg-light');
    // whitelist
    $('textarea').addClass('bg-transparent').addClass('text-white');
    // status-check
    $('input').addClass('bg-transparent').addClass('text-white');
    $('.form-select').addClass('form-dark');
    // motd
    $('.form-check-input').removeClass('bg-transparent');
    $('.btn-light').removeClass('btn-light').addClass('btn-dark');
}

function setLight() {
    $("#darkSwitch").prop("checked", false);
    $('.navbar').addClass('navbar-light').removeClass('navbar-dark');
    $('.text-white').addClass('text-muted').removeClass('text-white');
    $('.card').removeClass('bg-transparent').removeClass('border-light');
    $('footer').addClass('bg-light').removeClass('bg-dark').removeClass('bg-opacity-50');
    // whitelist
    $('textarea').removeClass('bg-transparent').removeClass('text-white');
    // status-check
    $('input').removeClass('bg-transparent').removeClass('text-white');
    $('.form-select').removeClass('form-dark');
    // motd
    $('.form-check-input').addClass('bg-transparent');
    $('.btn-dark').addClass('btn-light').removeClass('btn-dark');
}

if (localStorage.getItem("darkSwitch")) {
    if (localStorage.getItem("darkSwitch") == "dark") {
        setDark();
        localStorage.setItem("darkSwitch", "dark");
    } else if (localStorage.getItem("darkSwitch") == "light") {
        setLight();
        document.body.setAttribute("data-theme", "light");
    }
} else if (!localStorage.getItem("darkSwitch")) {
    setDark();
    localStorage.setItem("darkSwitch", "dark");
}


$('#darkSwitch').click(function () {
    if ($('body').attr('data-theme') == 'dark') {
        setLight();
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("darkSwitch", "light");
    } else if ($('body').attr('data-theme') == 'light') {
        setDark();
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("darkSwitch", "dark");
    }
});