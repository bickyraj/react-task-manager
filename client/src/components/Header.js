import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav>
          <a className="menu-list" href="/">Home</a>
          <a className="menu-list" href="/profile">Profile</a>
        {/* <Link className="menu-list" to="/profile">Profile</Link> */}
      </nav>
    </>
  );
}

export default Header;