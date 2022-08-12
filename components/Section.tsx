import { ReactNode, useState } from 'react';

export function Section({
  children,
  label,
  hideHeading,
  className,
}: {
  children?: ReactNode;
  className?: string;
  label?: string;
  hideHeading?: boolean;
}) {
  return (
    <div className={className}>
      {!hideHeading && <h1>{label ?? 'Add Text'}</h1>}
      {children}
    </div>
  );
}
