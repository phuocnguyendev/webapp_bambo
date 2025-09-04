import logo from "@/assets/images/logo.svg";
import { Button } from "../ui/button";
import TopNavbar from "./TopNavbar";
import { Link } from "react-router-dom";
const Logo = () => (
  <Link to="/">
    <img src={logo} alt="Logo" />
  </Link>
);

export default function TopBar() {
  return (
    <header className="fixed z-50 top-0 left-0 w-full h-[60px] bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button
          size="icon"
          variant="secondary"
          className="lg:hidden bg-transparent text-brand-primary"
        ></Button>
        <Logo />
      </div>
      <TopNavbar />
    </header>
  );
}
