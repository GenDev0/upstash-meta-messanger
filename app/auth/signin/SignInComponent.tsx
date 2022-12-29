"use client";

import { BuiltInProviderType } from "next-auth/providers";
import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignInComponent({ providers }: Props) {
  return (
    <div className='flex justify-center'>
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "http://localhost:3000",
              })
            }
          >
            Sign In with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignInComponent;
