export default function DangerAlert({ children }: any) {
  return (
    <p className="text-danger bg-rose-100 px-4 py-3 rounded-lg">{children}</p>
  );
}
