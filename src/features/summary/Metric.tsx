import React from 'react';

export interface MetricProps {
  metric: number;
  description: string;
}

const Metric = ({ metric, description }: MetricProps) => {
  return (
    <div className="font-mono flex flex-row md:flex-col content-start border-b border-main-border md:border-0">
      <div className="p-2 text-6xl font-bold md:border-b md:border-gray text-base-blue">{metric}</div>
      <div className="p-2 text-gray mt-auto md:mt-0">{description}</div>
    </div>
  );
};

export default Metric;
