import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

export type ClerkProviderWrapperProps = {
  children: ReactNode;
};

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
