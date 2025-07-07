'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, SigninSchema } from '@/validation/signInValidation';
import SubmitButton from '@/components/global/submitButton';
import HookFormInput from '@/components/global/hookFormInput';
import useRootStore from '@/store';

export default function SigninForm() {
  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { error, isLoading, signInFetch } = useRootStore();

  const onSubmit = async (data: SigninSchema) => {
    await signInFetch(data);

  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Input */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
          Email Address
        </label>
        <HookFormInput
          name="email"
          control={form.control}
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400"
        />
      </div>

      {/* Password Input */}
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
          Password
        </label>
        <HookFormInput
          name="password"
          control={form.control}
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <SubmitButton
          text="Sign In"
          isLoading={isLoading}
          disabled={!form.formState.isValid}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        />
      </div>

      {/* Sign Up Link */}
      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500 transition duration-200 ease-in-out"
          >
            Sign up here
          </a>
        </p>
      </div>
    </form>
  );
}
