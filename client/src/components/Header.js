import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav>
          <Link className="menu-list" to="/profile">Profile</Link>
      </nav>
    </>
  );
}

export default Header;