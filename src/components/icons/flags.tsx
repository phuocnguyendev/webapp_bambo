import gb from '@/assets/flags/gb.svg';
import nl from '@/assets/flags/nl.svg';
import { cn } from '@/lib/utils';

type FlagProps = {
  className?: string;
};

export const UKFlag = ({ className }: FlagProps) => (
  <img src={gb} alt="UK Flag" className={cn('h-6 w-6', className)} />
);

export const NLFlag = ({ className }: FlagProps) => (
  <img src={nl} alt="NL Flag" className={cn('h-6 w-6', className)} />
);
