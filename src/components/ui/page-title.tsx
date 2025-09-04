import { cn } from '@/lib/utils';
import React from 'react';
import MaskIcon, { MaskIconName } from './mask-icon';

interface PageTitleProps {
  icon: MaskIconName;
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  className,
  icon,
  title,
  actions,
  children,
  id = 'pageTitle',
}) => {
  return (
    <div className={cn('flex flex-col w-full gap-3 p-6 bg-white', className)} id={id}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative mr-4 text-accent bg-accent bg-opacity-90 h-16 w-16 rounded-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <MaskIcon name={icon} size={28} color="bg-brand-primary" />
            </div>
          </div>
          <h1 className="text-xl font-normal">{title}</h1>
        </div>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>

      {children}
    </div>
  );
};
