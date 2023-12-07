import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // navigate('/login');
  };

  return (
    <>
      {location.pathname === '/' && (
        <nav className="flex justify-between items-center bg-teal-600 text-white p-4">
          <div>
            <h1 className="text-2xl font-bold">URL SHORTENER</h1>
          </div>
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                  Login
                </button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
