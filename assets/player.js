// Alerta de SweetAlert
function showErrorAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonColor: '#0d6efd'
    });
}
// detectar si existe el usuario
function MsgAlertNoFound(data) {
    var element = document.getElementById('noFound');
    if(data == 204){
        element.classList.remove('d-none');
    } else if(data == 200){
        element.classList.add('d-none');
    }
}
// Mostrar datos obtenidos de la api
async function ShowData(data) {
    try {
        const response = await axios.get(`https://api.mctools.pro/mojang/v1/${data}`);
        const lastSkinNum = response.data.mojang.username_history.length - 1;
        document.getElementById('skin-body').src = response.data.skin.body_render;
        document.getElementById('skin-link').href = `https://www.minecraft.net/profile/skin/remote?url=${response.data.skin.skin}.png&model=classic`;
        document.getElementById('skin-avatar').src = response.data.skin.avatar;
        document.getElementById('username').textContent = response.data.mojang.username;
        document.getElementById('player-uuid').value = response.data.mojang.uuid;
        document.getElementById('player-uuid-trimmed').value = data;
        if(lastSkinNum == 0){
            document.getElementById('player-previous-nick').value = 'Not available';
        }else{
            document.getElementById('player-previous-nick').value = response.data.mojang.username_history[lastSkinNum].name;
        }
    } catch (error) {
        console.error(error);
    }


}

async function getSearch(textInput) {
    const selectInput = document.getElementById('select-input').value;
    if (selectInput == 'username') {
        await axios.get(`https://api.mojang.com/users/profiles/minecraft/${textInput}`)
            .then(function (response) {
                if (response.status == 200) {
                    MsgAlertNoFound(response.status);
                    ShowData(response.data.id);
                } else if (response.status == 204) {
                    MsgAlertNoFound(response.status);
                } else {
                    MsgAlertNoFound('204');
                    showErrorAlert();
                    console.error(response);
                }
            })
            .catch(function (error) {
                MsgAlertNoFound('204');
                showErrorAlert();
                console.error(error);
            });
    } else if(selectInput == 'uuid'){
        await axios.get(`https://api.mojang.com/user/profile/${textInput}`)
            .then(function (response) {
                if (response.status == 200) {
                    MsgAlertNoFound(response.status);
                    ShowData(response.data.id);
                } else if (response.status == 204) {
                    MsgAlertNoFound(response.status);
                } else {
                    MsgAlertNoFound('204');
                    showErrorAlert();
                    console.error(response);
                }
            })
            .catch(function (error) {
                MsgAlertNoFound('204');
                showErrorAlert();
                console.error(error);
            });
    }
}

document.getElementById('button-search').addEventListener("click", () => {
    const textInput = document.getElementById('search-input').value;
    if(textInput == ''){
        return;
    } else{
        getSearch(textInput);
    }
});
