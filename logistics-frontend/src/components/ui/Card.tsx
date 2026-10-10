import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  footer,
}) => {
  return (
    <div className={`rounded-xl bg-white p-6 shadow-sm border border-slate-200 transition hover:shadow-md ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
          {title}
        </h3>
      )}
      <div className="text-slate-600">{children}</div>
      {footer && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          {footer}
        </div>
      )}
    </div>
  );
};