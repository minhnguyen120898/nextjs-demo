import * as React from 'react';
import { LayoutProps } from '@/models/common';

export function EmptyLayoutComponent ({children}: LayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
