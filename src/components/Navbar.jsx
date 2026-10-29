import { NavLink } from "react-router-dom";

import { signOut } from "firebase/auth";
import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuthValue();

  const { auth } = useAuthentication();

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao terminar sessão:", error);
  }
};

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-gray-800">
          Mini <span className="text-blue-600">Blog</span>
        </NavLink>

        <ul className="flex items-center gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink
                  to="/post/create"
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                  }
                >
                  Novo Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashbord"
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
    <button
      onClick={handleLogout}
      className="font-medium text-gray-600 hover:text-red-600 transition-colors duration-200"
    >
      Sair
    </button>
  </li>
            </>
          )}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
