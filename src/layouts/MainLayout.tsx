import { ReactNode } from 'react';
import { Header } from '../common/components/Header/Header';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen  max-w-6xl mx-auto bg-white relative">
      <Header />
      <div className="pt-20 px-7">{children}</div>
    </div>
  );
};
