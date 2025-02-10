import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen p-7 max-w-6xl mx-auto bg-white shadow">
      {children}
    </div>
  );
};
