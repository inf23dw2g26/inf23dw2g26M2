import { GoogleLogin } from 'react-google-login';

const clientId = "146954126349-jlp6bek411g29mj7dl27p70mssiihf9v.apps.googleusercontent.com";

function Login(){
    
    const onSuccess = (res) => {
        console.log("Login efectuado com sucesso! Usuário: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Logout efetuado com sucesso! ", res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;