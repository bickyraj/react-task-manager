import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Auth from "../Auth";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <div className="list-item">
          Email: {user.userEmail}
        </div>
      )}
    </>
  );
}

export default Profile;
