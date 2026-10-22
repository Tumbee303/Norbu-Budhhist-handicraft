import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = 'xl', className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'max-w-container-sm',
      md: 'max-w-container-md',
      lg: 'max-w-container-lg',
      xl: 'max-w-container-xl',
      '2xl': 'max-w-container-2xl',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';