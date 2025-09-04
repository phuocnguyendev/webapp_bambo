import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className={cn('form-control', className)}>
        <input
          type={type}
          ref={ref}
          {...props}
          className="w-full p-0 m-0 border-0 outline-none bg-transparent"
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
