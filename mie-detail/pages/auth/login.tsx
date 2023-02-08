
import { LoginFormComponent } from '@/components/auth';
import { AuthLayoutComponent } from '@/layout/auth';
import * as React from 'react';

LoginPage.Layout = AuthLayoutComponent;

export default function LoginPage () {
  return (
    <div className='container'>
      <LoginFormComponent />
    </div>
  );
}
