import { InputField } from '@/core/form';
import { LoginPayload } from '@/models/auth-models';
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';


export interface LoginFormProps {
  onSubmit?: (payload: LoginPayload) => void
}

export function LoginFormComponent ({ onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  function handleLogin(payload: LoginPayload) {
    onSubmit?.(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <InputField name="email" label="Email" control={control} />
      <InputField type="password" name="password" label="Password" control={control}  />
    
      <button type='submit'>Submit</button>
    </form>
  );
}
