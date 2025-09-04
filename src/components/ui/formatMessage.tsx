import React from 'react';
import { cn } from '@/lib/utils';

interface MessageProps {
  title: string;
  className?: string;
}

const FormatMessage: React.FC<MessageProps> = ({ title, className }) => {
  const message = title;

  return (
    <div
      className={cn('p-4 bg-white text-gray-800 rounded-lg', className)} 
    >
      {message}
    </div>
  );
};

export default FormatMessage;
