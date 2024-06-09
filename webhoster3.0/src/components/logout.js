import { GoogleLogout } from "react-google-login";
import AuthContext from "./authContext";
import { useContext } from "react";
 
const clientId = "146954126349-jlp6bek411g29mj7dl27p70mssiihf9v.apps.googleusercontent.com";
 
function Logout() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const onSuccess = (res) => {
    localStorage.setItem("profile", null);
    console.log("LOGOUT efectuado com sucesso");
    setAuthenticated(false);
  };
  return (
<div id="signOutButton" className="signOutButton">
<GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
</div>
  );
}
export default Logout;

