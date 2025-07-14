
import { ReactNode } from 'react';

interface ResponsiveFiltersProps {
  children: ReactNode;
}

const ResponsiveFilters = ({ children }: ResponsiveFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveFilters;
