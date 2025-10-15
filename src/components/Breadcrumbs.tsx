import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const location = useLocation();
  const crumbs =
    items ||
    location.pathname
      .split("/")
      .filter(Boolean)
      .map((segment, idx, arr) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: "/" + arr.slice(0, idx + 1).join("/"),
      }));

  return (
    <nav className="flex items-center space-x-1 text-base font-medium my-2">
      <Link to="/" className="flex items-center text-green-700 hover:underline">
        <Home className="mr-1 w-5 h-5" /> Trang chủ
      </Link>
      {crumbs.map((item, idx) => (
        <React.Fragment key={item.path}>
          <span className="mx-1 text-green-700">&#187;</span>
          {idx === crumbs.length - 1 ? (
            <span className="text-gray-900">{item.label}</span>
          ) : (
            <Link to={item.path} className="text-green-700 hover:underline">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
