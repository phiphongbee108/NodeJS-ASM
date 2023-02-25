import { Link } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import Cookies from "js-cookie";
function LoginLink(props) {
  const onRedirect = () => {
    const fetchData = async () => {
      const response = await UserAPI.postLogout();
      console.log(response);
    };

    fetchData();

    sessionStorage.removeItem("currentuser");
    Cookies.remove("user");
    window.location.reload();
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
