import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import styled from 'styled-components';
import MaskInput from './MaskInputTime';
import { forwardRef } from 'react';

const _DateTime = styled(Datetime)``;

export const MaskInputTime = forwardRef<
  React.ElementRef<typeof MaskInput>,
  React.ComponentPropsWithoutRef<typeof MaskInput>
>((props: any, ref) => {
  const { openCalendar } = props;

  const handleFocus = () => {
    if (openCalendar) {
      openCalendar();
    }
  };

  return <MaskInput ref={ref} {...props} handleFocus={handleFocus} />;
});

MaskInputTime.displayName = 'MaskInputTime';

export default _DateTime;
