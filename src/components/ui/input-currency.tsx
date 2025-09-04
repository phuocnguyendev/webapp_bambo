import * as React from 'react';
import { NumericFormat } from 'react-number-format';
import { cn } from '@/lib/utils';
import { Euro } from 'lucide-react';

const InputCurrency = React.forwardRef<
  React.ElementRef<typeof NumericFormat>,
  React.ComponentPropsWithoutRef<typeof NumericFormat>
>(({ className, value, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('form-control', className)}>
      <div className="flex items-center gap-1 w-full">
        <Euro size={18} />
        <NumericFormat
          {...props}
          className="w-full p-0 m-0 border-0 outline-none bg-transparent"
          fixedDecimalScale={true}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          inputMode="numeric"
          allowNegative={props.allowNegative || false}
          allowLeadingZeros={props.allowLeadingZeros || false}
          value={value ? Number(value) : ''}
        />
      </div>
    </div>
  );
});
InputCurrency.displayName = 'InputCurrency';

export { InputCurrency };
