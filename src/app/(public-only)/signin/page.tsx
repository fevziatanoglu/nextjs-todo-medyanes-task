'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, SigninSchema } from '@/validation/signInValidation';
import { useAuthStore } from '@/store/authStore';
import SubmitButton from '@/components/global/submitButton';
import HookFormInput from '@/components/global/hookFormInput';

export default function SigninPage() {
  const router = useRouter();
  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { error, isLoading, signInFetch } = useAuthStore()

  const onSubmit = async (data: SigninSchema) => {
    signInFetch(data)
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Log In</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">

        <HookFormInput
          name="email"
          control={form.control}
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />

        <HookFormInput
          name="password"
          control={form.control}
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        {error && <p className="text-red-600 mt-2">{error}</p>}
        
        <SubmitButton text="Login" isLoading={isLoading} disabled={!form.formState.isValid} />
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
