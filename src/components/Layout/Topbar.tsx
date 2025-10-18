import TopNavbar from "./TopNavbar";

const Logo = () => (
  <div className="flex items-center gap-2">
    <img
      src={"/contents/logo.png"}
      alt="Logo"
      className="h-10 w-10 object-contain rounded-full shadow"
    />
    <span className="hidden md:inline font-bold text-xl text-green-700 tracking-tight drop-shadow-sm decoration-none hover:decoration-none">
      Bamboo Warehouse
    </span>
  </div>
);

export default function TopBar() {
  return (
    <header
      className="sticky z-40 top-0 left-0 w-full h-[54px] bg-white flex items-center px-4"
      style={{
        boxShadow:
          "0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex items-center min-w-[200px]">
        <Logo />
      </div>
      <div className="flex-1" />
      <div className="flex items-center min-w-[180px] justify-end">
        <TopNavbar />
      </div>
    </header>
  );
}
