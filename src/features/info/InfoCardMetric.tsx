import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export interface MetricProps {
  metric: number | string;
  total?: number;
  description: string;
  icon?: IconDefinition;
  size?: 'large' | 'small';
}

const InfoCardMetric = ({ metric, description, size = 'small', icon }: MetricProps) => {
  return (
    <div
      className={clsx('font-mono flex flex-row gap-1 content-start rounded-lg mb-4', { 'basis-full': size === 'large' }, { 'basis-1/2': size === 'small' })}>
      {icon && <FontAwesomeIcon icon={icon} className="p-2 w-8 h-8 text-base-blue my-auto" />}
      <div className="flex-1 my-auto">
        <div className={'flex text-base-blue font-bold'}>
          <div className={'text-xl'}>{metric}</div>
        </div>
        <div className="text-gray mt-auto md:mt-0">{description}</div>
      </div>
    </div>
  );
};

export default InfoCardMetric;
