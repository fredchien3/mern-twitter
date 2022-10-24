import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './NavBar.css';

export default function NavBar() {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  }

  const links = loggedIn ? (
    <div className="navbar-links">
      <Link to="/tweets">All Tweets</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/tweets/new">Write a Tweet</Link>
      <button onClick={handleClick}>Logout</button>
    </div>
  ) : (
    <div className="navbar-links">
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  )
  
  return (
    <nav className="navbar">
      {links}
    </nav>
  )
}