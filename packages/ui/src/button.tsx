"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  appName: string;
  // onClick?: () => void;
}

export const Button = ({
  children,
  className,
  appName,
  // onClick,
  ...props
}: ButtonProps) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
