import { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => (
  <div className="bg-slate-900 p-6 rounded-lg shadow-md border border-slate-800">
    {children}
  </div>
);
