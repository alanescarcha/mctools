if (deviceType() == "mobile" || deviceType() == "tablet") {
    document.getElementById('motd-server').classList.add('d-none');
}

$(document).ready(function () {
    "use strict";

    var obfuscated_animation_request_id = -1;

    $('.show-toggle').each(function () {
        var toggle = $(this);
        var toggle_elm = $('#' + $(this).attr('id').replace('show_', ''));

        toggle_elm.hide();

        toggle.click(function (e) {
            var current_text = toggle.text();
            var next_text = toggle.data('toggle-text');

            toggle.text(next_text);
            toggle.data('toggle-text', current_text);

            toggle_elm.fadeToggle();
            e.preventDefault();
        });
    });

    $('#players img').tooltip();

    $('form input[type=text]').focus(function () {
        $(this).select();
    });

    animate_obfuscated_text();
});

function animate_obfuscated_text() {
    obfuscated_animation_request_id = window.requestAnimationFrame(animate_obfuscated_text);

    $('.minecraft-formatted--obfuscated').each(function () {
        var random_string = '';

        for (var x = 0; x < this.innerHTML.length; x++)
            random_string += String.fromCharCode(Math.floor(Math.random() * (95 - 64 + 1)) + 64);

        this.innerHTML = random_string;
    });
}

// Alerta de SweetAlert
function showErrorAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonColor: '#0d6efd'
    });
}
// detectar si el mc server esta online
function mcServerStatus(data) {
    var element = document.getElementById('noFound');
    if (data == false) {
        element.classList.remove('d-none');
        document.getElementById('server-icon').src = '../assets/img/default-icon.png';
        document.getElementById('server-motd').innerHTML = `<span style="color: #AA0000;">Can't connect to server.</span>`;
        document.getElementById('server-ping-players').innerHTML =
        document.getElementById('box-status').classList.add('bg-danger');
        document.getElementById('box-status').classList.remove('bg-success');
        document.getElementById('box-status').classList.remove('bg-secondary');
        document.getElementById('box-status-string').textContent = 'Offline';
        document.getElementById('box-status-span').textContent = 'The server is offline :/';
        document.getElementById('server-ping-players').innerHTML = `<img class="ms-1"
        src="../assets/img/ping-offline.png">`;
        document.getElementById('server-players').value = '0 / 0';
        document.getElementById('server-version').value = 'None';
        document.getElementById('server-software').value = 'None';
        document.getElementById('server-hostname').value = 'None';
        document.getElementById('server-protocol').value = 'None';
        document.getElementById('server-ip-address').value = 'None';
        document.getElementById('server-cached').value = 'None';
        document.getElementById('server-port').value = 'None';
        document.getElementById('server-srv').value = 'None';
        document.getElementById('server-query').value = 'None';
        document.getElementById('server-ping').value = 'None';
    } else if (data == true) {
        element.classList.add('d-none');
    }
}


// Mostrar datos obtenidos de la api
async function ShowData(data, type) {
    try {
        var response;
        if (type == 'bedrock-server') {
            response = await axios.get(`https://api.mcsrvstat.us/bedrock/2/${data}`);
        } else if (type == 'java-server') {
            response = await axios.get(`https://api.mcsrvstat.us/2/${data}`);
        }
        if (response.data.online == true) {
            if (response.data.icon) {
                document.getElementById('server-icon').src = response.data.icon;
            } else {
                document.getElementById('server-icon').src = '../assets/img/default-icon.png';
            }
            if (response.data.motd.html[0] && response.data.motd.html[1]) {
                document.getElementById('server-motd').innerHTML = `${response.data.motd.html[0]}<br>${response.data.motd.html[1]}`;
            } else if (response.data.motd.html[0] && !response.data.motd.html[1]) {
                document.getElementById('server-motd').innerHTML = `${response.data.motd.html[0]}`;
            } else if (!response.data.motd.html[0] && response.data.motd.html[1]) {
                document.getElementById('server-motd').innerHTML = `${response.data.motd.html[1]}`;
            } else {
                document.getElementById('server-motd').innerHTML = '';
            }
            document.getElementById('server-ping-players').innerHTML = `${response.data.players.online}<span>/</span>${response.data.players.max}<img class="ms-1"
            src="../assets/img/ping.png">`;
            document.getElementById('box-status').classList.remove('bg-danger');
            document.getElementById('box-status').classList.remove('bg-secondary');
            document.getElementById('box-status').classList.add('bg-success');
            document.getElementById('box-status-string').textContent = 'Online';
            document.getElementById('box-status-span').textContent = 'The server is online :)';
            document.getElementById('server-players').value = `${response.data.players.online} / ${response.data.players.max}`;
            if (response.data.software) {
                document.getElementById('server-version').value = response.data.version;
                document.getElementById('server-software').value = response.data.software;
            } else {
                document.getElementById('server-version').value = response.data.version;
                document.getElementById('server-software').value = 'None';
            }
            document.getElementById('server-hostname').value = response.data.hostname;
            document.getElementById('server-protocol').value = response.data.protocol;
            document.getElementById('server-ip-address').value = response.data.ip;
            if (response.data.debug.cachetime == 0) {
                document.getElementById('server-cached').value = 'No';
            } else {
                document.getElementById('server-cached').value = 'Yes';
            }
            document.getElementById('server-port').value = response.data.port;
            if (response.data.debug.cnameinsrv == true && response.data.debug.srv == true) {
                document.getElementById('server-srv').value = 'Yes, but CNAME record detected in target field. Target should only be an A/AAAA record.';
            } else if (response.data.debug.cnameinsrv == false && response.data.debug.srv == true) {
                document.getElementById('server-srv').value = 'Yes';
            } else {
                document.getElementById('server-srv').value = 'No';
            }
            if (response.data.debug.query == true) {
                document.getElementById('server-query').value = 'Yes';
            } else {
                document.getElementById('server-query').value = 'No';
            }
            if (response.data.debug.ping == true) {
                document.getElementById('server-ping').value = 'Yes';
            } else {
                document.getElementById('server-ping').value = 'No';
            }
        }
    } catch (error) {
        console.error(error);
    }


}

async function getSearch(textInput) {
    const selectInput = document.getElementById('select-input').value;
    if (selectInput == 'java-server') {
        await axios.get(`https://api.mcsrvstat.us/2/${textInput}`)
            .then(function (response) {
                if (response.status == 200) {
                    mcServerStatus(response.data.online);
                    ShowData(textInput, selectInput);
                } else {
                    mcServerStatus(response.data.online);
                    showErrorAlert();
                    console.error(response);
                }
            })
            .catch(function (error) {
                showErrorAlert();
                console.error(error);
            });
    } else if (selectInput == 'bedrock-server') {
        await axios.get(`https://api.mcsrvstat.us/bedrock/2/${textInput}`)
            .then(function (response) {
                if (response.status == 200) {
                    mcServerStatus(response.data.online);
                    ShowData(textInput, selectInput);
                } else {
                    mcServerStatus(response.data.online);
                    showErrorAlert();
                    console.error(response);
                }
            })
            .catch(function (error) {
                showErrorAlert();
                console.error(error);
            });
    }
}

document.getElementById('button-search').addEventListener("click", () => {
    const textInput = document.getElementById('search-input').value;
    if (textInput == '') {
        return;
    } else {
        getSearch(textInput);
    }
});
