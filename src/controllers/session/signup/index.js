import './signup.scss';
import Dashboard from '../../../utils/dashboard';

export default function(view) {
    function onLoginSuccessful(id, accessToken, apiClient) {
        Dashboard.onServerChanged(id, accessToken, apiClient);
        Dashboard.navigate('voucher.html');
    }
    view.querySelector('.btnregister').addEventListener('click', function() {
        ApiClient.ajax({
            type: 'POST',
            url: 'http://localhost:3600/auth/register',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                name: view.querySelector('#txtName').value,
                password: view.querySelector('#txtPassword').value
            })
        }).then(() => {
            ApiClient.ajax({
                type: 'POST',
                url: 'http://localhost:3600/auth/login',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    Username: view.querySelector('#txtName').value,
                    Pw: view.querySelector('#txtPassword').value
                })
            }).then(function(result) {
                const user = result.User;

                ApiClient.setAuthenticationInfo(result.AccessToken, user.Id);
                onLoginSuccessful(user.Id, result.AccessToken, ApiClient);
            });
        }).catch(error => {
            console.log(error);
        });
    });
}

