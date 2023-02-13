import * as React from 'react';
import { LayoutProps } from '@/models/common';
import { NotLoginGuard } from 'shared/guard';
import FooterComponent from '@/core/footer';

export function AuthLayoutComponent ({children}: LayoutProps) {
  return (
    <NotLoginGuard>
      {children}
      <FooterComponent />
    </NotLoginGuard>
  );
}
