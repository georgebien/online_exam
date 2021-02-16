$(document).ready(function () {

});

const LOGIN = (() => {

    let this_login = {};

    this_login.login = () => {

        if ($('#txt_username').val() === '') 
        {
            Toast.fire({
                icon: 'warning',
                title: 'Please enter username'
            })
            $('#txt_username').focus();
        }
        else 
        {
            if ($('#txt_password').val() === '') 
            {
                Toast.fire({
                    icon: 'warning',
                    title: 'Please enter password'
                })
                $('#txt_password').focus();
            } 
            else 
            {
                $.ajax({
                    url : 'login-process',
                    type: 'post',
                    data:
                    {
                        _token   : _TOKEN,
                        username : $('#txt_username').val(),
                        password : $('#txt_password').val(),
                    },
                    success: data => {

                        if (data[0] === 'true') {

                            if (data[1]['user_type'] === 'Admin')
                            {
                                location.href = 'http://localhost/online_exam/public/songs';
                            } 
                            else 
                            {
                                alert('Other page for other user type')
                            }
                        }
                        else 
                        {
                            Toast.fire({
                                icon: 'warning',
                                title: 'User does not exist'
                            })
                            $('#txt_username').val('');
                            $('#txt_password').val('');
                            $('#txt_username').focus();
                        }
                    }
                });
            }
        }
    }

    return this_login;

})();
$(document).bind('keypress', function (e) {
    if (e.keyCode == 13) {
        $('#btn_login').trigger('click');
    }
});