import React from 'react';

export interface MetricProps {
  metric: number;
  total: number;
  description: string;
}

const Metric = ({ metric, total, description }: MetricProps) => {
  return (
    <div className="font-mono flex flex-row md:flex-col content-start border-b border-main-border md:border-0">
      <div className={'flex p-2 md:border-b md:border-gray text-base-blue font-bold'}>
        <div className="text-6xl">{metric}</div>
        <div className="mt-auto pr-1">/</div>
        <div className="mt-auto">{total}</div>
      </div>
      <div className="p-2 text-gray mt-auto md:mt-0">{description}</div>
    </div>
  );
};

export default Metric;
