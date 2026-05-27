import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 py-2 shadow-sm backdrop-blur">
      <Container>
        <nav className="flex items-center gap-4">
          <div className="mr-2 shrink-0">
            <Link to="/">
              <Logo width="56px" />
            </Link>
          </div>
          <ul className="ml-auto flex flex-wrap items-center gap-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block rounded-full px-5 py-2.5 text-base font-medium transition duration-200 ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null,
            )}
            {authStatus && (
                <li>
                    <LogoutBtn/>
                </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
