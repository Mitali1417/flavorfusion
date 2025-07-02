import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';

interface TextToolTipProps extends React.ComponentProps<typeof TooltipContent> {
  children: React.ReactNode;
  label: string;
}

export const TextToolTip: React.FC<TextToolTipProps> = ({
  children,
  label,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild role="button">
          {children}
        </TooltipTrigger>
        <TooltipContent {...props}>
          <span className='text-white'>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
