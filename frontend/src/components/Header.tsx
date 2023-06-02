import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>MyGoals</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUserPlus /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
}
