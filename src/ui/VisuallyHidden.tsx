import type { HTMLAttributes, ForwardedRef, ElementType } from 'react';
import { forwardRef } from 'react';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  as?: ElementType;
}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, as: Component = 'span', className = '', ...props }, ref: ForwardedRef<HTMLSpanElement>) => {
    return (
      <Component
        ref={ref}
        className={`sr-only ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';