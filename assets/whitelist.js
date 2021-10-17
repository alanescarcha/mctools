$('#whitelist-create').click(function(e){
    if ($.trim($('#whitelist-usernames').val()) == '')
        return;

    $('#whitelist-create').button('loading');

    var form = $('#whitelist').serialize();

    $.post('https://api-corsbypass.herokuapp.com/https://mctools.org/whitelist-creator/json', form, function(whitelist){
        var whitelist_pretty = JSON.stringify(whitelist['users'], null, 1);

        document.getElementById('whitelist-string').classList.remove('d-none');
        $('#whitelist-output').val(whitelist_pretty);

        $('#whitelist-link').attr('href', 'data:application/octet-stream;charset=utf-8;base64,' + window.btoa(whitelist_pretty));

        if (whitelist['errors'] != '') {
            document.getElementById('whitelist-errors').classList.remove('d-none');
            var ul = $('#whitelist-errors ul');

            ul.empty();
        }

        else
        document.getElementById('whitelist-errors').classList.add('d-none');

        $('#whitelist-create').button('reset');
    });
});
