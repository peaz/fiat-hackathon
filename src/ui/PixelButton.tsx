import type { ComponentProps } from 'react';

type Props = ComponentProps<'button'> & { variant?: 'primary' | 'secondary' };
export function PixelButton({ variant = 'primary', className = '', ...props }: Props) {
  return <button {...props} className={`pixel-button ${variant === 'secondary' ? 'secondary' : ''} ${className}`} />;
}
