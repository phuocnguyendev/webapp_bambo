import { Spin } from "@/components/ui/spin";

const FullPageLoading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70">
      <Spin />
    </div>
  );
};

export default FullPageLoading;
