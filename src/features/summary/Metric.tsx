import React, { useState } from 'react';
import clsx from 'clsx';

export interface MetricProps {
  metric: number;
  total: number;
  description: string;
  size?: 'large' | 'medium';
}

const Metric = ({ metric, total, description, size = 'medium' }: MetricProps) => {
  const [showPercentage, setShowPercentage] = useState<boolean>(false);

  const percentage = ((metric / total) * 100).toFixed(0);

  return (
    <div
      className={clsx('font-mono flex flex-row md:flex-col content-start border-b border-main-border md:border-0', { 'px-8 hover:rounded-lg hover:bg-light-blue-hover-2': size === 'medium' })}
      onMouseEnter={() => setShowPercentage(true)}
      onMouseLeave={() => setShowPercentage(false)}
    >
      <div className={clsx('flex p-2 md:border-b md:border-gray text-base-blue font-bold')}>
        <div
          className={clsx('flex', { 'hidden': showPercentage }, { 'min-w-20': size === 'medium' }, { 'min-w-36': size === 'large' })}>
          <div className={clsx({ 'text-3xl': size === 'medium' }, { 'text-6xl': size === 'large' })}>{metric}</div>
          <div className="mt-auto pr-1 pl-1">/</div>
          <div className="mt-auto">{total}</div>
        </div>
        <div
          className={clsx({ 'text-3xl min-w-20': size === 'medium' }, { 'text-6xl min-w-36': size === 'large' }, { 'hidden': !showPercentage })}>{percentage}%
        </div>
      </div>
      <div className="p-2 text-gray mt-auto md:mt-0">{description}</div>
    </div>
  );
};

export default Metric;
