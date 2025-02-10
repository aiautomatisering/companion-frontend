import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const LoadingWrapper = ({ children }: Props) => {
  return (
    <div className="h-screen bg-gray-400/60 inset-0 flex justify-center items-center absolute z-10 w-6xl mx-auto shadow">
      {children}
    </div>
  );
};
