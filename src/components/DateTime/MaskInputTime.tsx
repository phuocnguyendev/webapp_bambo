import { cn } from '@/lib/utils';
import cloneDeep from 'lodash/cloneDeep';
import { forwardRef, useEffect, useState } from 'react';
import MaskInput, { ReactInputMask } from 'react-input-mask';

interface MaskInputTimeProp {
  refClassName?: string;
  className?: string;
  value: string;
  onChange: (e: any) => void;
  handleFocus?: () => void;
  handleBlur?: (e: any) => void;
  disabled?: boolean;
  maxDigitsHours?: number;
}

const MaxDigitsHours = 23;

const configs = {
  23: {
    regexTime: /^([01]?\d|2[0-3]):[0-5]\d$/,
    mask: '99:99',
    formatChars: {
      1: '[0-2]',
      2: '[0-9]',
      3: '[0-5]',
      4: '[0-9]',
    },
    condition2ndDigit: '[0-3]',
  },
  99: {
    regexTime: /^(\d\d):[0-5]\d$/,
    mask: '99:99',
    formatChars: {
      1: '[0-9]',
      2: '[0-9]',
      3: '[0-5]',
      4: '[0-9]',
    },
    condition2ndDigit: '[0-9]',
  },
};

const MaskInputTime = forwardRef<ReactInputMask, MaskInputTimeProp>(
  (props: MaskInputTimeProp, ref) => {
    const {
      value,
      disabled = false,
      className,
      maxDigitsHours = MaxDigitsHours,
    } = props;
    const settings = configs[maxDigitsHours as keyof typeof configs];
    const [validValue, setValidValue] = useState(value);
    const [maskInputValue, setMaskInputValue] = useState(value);

    useEffect(() => {
      const validTime = cloneDeep(settings.regexTime).test(value);
      if (validTime && value !== validValue) {
        setValidValue(value);
        setMaskInputValue(value);
      }
    }, [value, validValue, settings]);

    const handleFocus = () => {
      props.onChange({ target: { value: validValue } });

      if (props?.handleFocus) {
        props.handleFocus();
      }
    };

    const handleBlur = (e: any) => {
      if (!settings.regexTime.test(maskInputValue) && value) {
        setMaskInputValue(value);
        setValidValue(value);
      }

      if (props?.handleBlur) {
        props.handleBlur(e);
      }
    };

    return (
      <MaskInput
        ref={ref}
        className={cn('form-control', className, props.refClassName)}
        value={maskInputValue}
        disabled={disabled}
        mask={settings.mask}
        onChange={(e) => {
          setMaskInputValue(e.target.value);

          if (settings.regexTime.test(e.target.value)) {
            setValidValue(e.target.value);
            props.onChange(e);
          }
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  },
);

MaskInputTime.displayName = 'MaskInputTime';

export default MaskInputTime;
