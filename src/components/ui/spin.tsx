import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface SpinProps {
  className?: string;
  classNameCircle?: string;
}
const Spin = ({ className, classNameCircle }: SpinProps) => {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      <LoaderCircle
        className={cn(
          'animate-spin h-8 w-8 text-brand-secondary',
          classNameCircle,
        )}
      />
    </div>
  );
};

export { Spin };
