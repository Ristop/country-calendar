import React, { ForwardedRef, forwardRef, ReactNode, useEffect, useRef } from 'react';
import { useButton } from 'react-aria';
import { filterDOMProps } from '@react-aria/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ButtonProps {
  onClick?: (e: unknown) => void;
  label?: ReactNode;
  ariaLabel?: string;
  icon?: IconDefinition;
  type?: 'button' | 'submit' | 'reset';
  size?: ButtonSize;
  className?: string;
}

export enum ButtonSize {
  SMALL = 'small',
}

export function useForwardedRef<T>(ref: ForwardedRef<T>) {
  const innerRef = useRef<T>(null);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { onClick, label, icon, ariaLabel, type = 'button', size = ButtonSize.SMALL, className = '', ...rest },
    propsRef
  ) => {
    const ref = useForwardedRef(propsRef);
    const { buttonProps } = useButton(
      {
        onPress: onClick,
        'aria-label': ariaLabel,
        type,
        ...rest,
      },
      ref
    );

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={`inline-block hover:cursor-pointer btn-small btn-primary ${className}`}
        {...filterDOMProps(rest)}
      >
        {
          <div className={`h-full flex items-center`}>
            {icon && <FontAwesomeIcon icon={icon} className={`icon`} />}
            {label && <div className={'hover:cursor-pointer'}>{label}</div>}
          </div>
        }
      </button>
    );
  }
);

export default Button;
