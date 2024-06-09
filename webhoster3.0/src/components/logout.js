import { GoogleLogout } from 'react-google-login';

const clientId = "146954126349-jlp6bek411g29mj7dl27p70mssiihf9v.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log("Logout bem sucedido!");
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}


            />

        </div>
    )
}

export default Logout;