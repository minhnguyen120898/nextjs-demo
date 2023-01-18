import * as React from 'react';
import { LayoutProps } from '@/models/common';
import HeaderComponent from '@/core/header';
import FooterComponent from '@/core/footer';


export function MainLayoutComponent ({children}: LayoutProps) {
  return (
    <>
      <HeaderComponent />
      <div>{children}</div>
      <FooterComponent />
    </>
  );
}
