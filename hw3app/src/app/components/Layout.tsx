import { Outlet, Link, useLocation } from "react-router";

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="gmu-header">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">George Mason University</h1>
            <div className="flex gap-6">
              <Link
                to="/"
                className={`nav-link ${isActive("/") ? "active" : ""}`}
              >
                Survey
              </Link>
              <Link
                to="/surveys"
                className={`nav-link ${isActive("/surveys") ? "active" : ""}`}
              >
                Survey List
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
