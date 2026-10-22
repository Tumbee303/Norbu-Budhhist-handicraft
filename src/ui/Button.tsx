import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { forwardRef, cloneElement, isValidElement } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-body font-medium transition-colors duration-fast rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-primary text-background hover:bg-primary-hover active:bg-primary/80',
      secondary: 'bg-surface text-text-primary border border-border hover:bg-surface/80 active:bg-surface',
      ghost: 'text-text-primary hover:bg-surface active:bg-surface/80',
      outline: 'border-2 border-primary text-primary hover:bg-primary/10 active:bg-primary/20',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-body-sm gap-1.5',
      md: 'px-5 py-2.5 text-body gap-2',
      lg: 'px-7 py-3 text-body-lg gap-2.5',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    const buttonProps = {
      ref,
      disabled: disabled || loading,
      className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`,
      ...props,
    };

    // asChild pattern: render child element with merged props
    if (asChild && isValidElement<Record<string, unknown>>(children)) {
      const child = children as ReactElement<Record<string, unknown>>;
      return cloneElement(child, {
        ...child.props,
        ...buttonProps,
        className: `${buttonProps.className} ${(child.props.className as string) || ''}`,
      } as Record<string, unknown>);
    }

    return (
      <button {...buttonProps}>
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';