import * as React from 'react';
import { cn } from '@/lib/utils';
import NumericInput, { NumericInputProps } from 'react-numeric-input';

export interface NumberInputProps extends NumericInputProps {
  type?: 'number'
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, type, ...props }) => {
    return (
      <NumericInput
        {...props}
        type={type}
        className={cn('form-control', className)}
      />
    );
  },
);
NumberInput.displayName = 'NumberInput';

export { NumberInput };
