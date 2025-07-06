'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupSchema } from '@/validation/signUpValidation';
import { useAuthStore } from '@/store/authStore';
import SubmitButton from '@/components/global/submitButton';
import HookFormInput from '@/components/global/hookFormInput';

export default function SignupPage() {
  const router = useRouter();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { error, isLoading, signupFetch } = useAuthStore();

  const onSubmit = async (data: SignupSchema) => {
    await signupFetch(data);
    // Optionally, redirect after successful signup:
    // if (!error) router.push('/signin');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <HookFormInput
          name="username"
          control={form.control}
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
        />

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
        <SubmitButton text="Sign Up" isLoading={isLoading} disabled={!form.formState.isValid} />
        <p className="text-center mt-4">
          Already have an account?{' '}
          <a
            href="/signin"
            className="text-blue-600 hover:underline"
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
