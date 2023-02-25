
import { LoginFormComponent } from 'components/auth';
import { AuthLayoutComponent } from '@/layout/auth';
import { LoginPayload } from '@/models/index';
import React from 'react';
import styles from "./login.module.scss";
import { useAuth } from '@/hooks/use-auth';
import { encode } from '@/service/encode-decode-service';
import { CrudType, Utils } from 'shared/enum';
import { useAlert, useLoading } from '@/hooks/index';
import { useRouter } from 'next/router';

LoginPage.Layout = AuthLayoutComponent;

export default function LoginPage () {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();
  const { login } = useAuth({
    revalidateOnMount: false
  });
  
  async function handleLogin(payload: LoginPayload) {
    showLoading();
    try {
      const auth = encode(`${payload.email}:${payload.password}:0`);
      const response = await login(auth);
      localStorage.setItem('token', response.token);
      router.push('/');
      hideLoading();
    } catch (error: any) {
      showAlert({
        title: Utils.TITLE_ERROR,
        message: error.message,
        mode: CrudType.CLOSE
      })
      hideLoading();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1>Login</h1>
        <LoginFormComponent 
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}

