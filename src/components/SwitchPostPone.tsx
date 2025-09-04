import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const SwitchPostPone = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-6 w-[3.2rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary before:block before:absolute before:left-1 before:h-[0.9rem] before:w-[0.9rem] before:rounded-full before:bg-cyan-400 relative data-[state=unchecked]:bg-gray-500/80 after:content-["Off"] after:ml-0.5 after:text-amber-500',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-[1.42rem] w-[1.42rem] rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.56rem] data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
));
SwitchPostPone.displayName = SwitchPrimitives.Root.displayName;

export { SwitchPostPone };
