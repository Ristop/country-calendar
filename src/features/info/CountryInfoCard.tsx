import React from 'react';
import Flag, { FlagSize } from '../../components/Flag';

export interface CountryInfoCardProps {
  name: string;
  code: string;
  numOfVisits: number;
}

const CountryInfoCard = ({ name, code, numOfVisits }: CountryInfoCardProps) => {
  return (
    <div
      className={`flex flex-col bg-light-blue w-96 max-w-[90%] gap-2 fixed bottom-4 right-4 rounded shadow p-4 z-10`}>
      <div className={'flex gap-2'}>
        <Flag code={code.toLowerCase()} size={FlagSize.MEDIUM} />
        <div className={'text-2xl font-bold text-base-blue my-auto'}>{name}</div>
      </div>
      <div className={'text-base-blue font-bold text-md'}>
        {numOfVisits} {numOfVisits > 1 ? 'visits' : 'visit'}
      </div>
    </div>
  );
};

export default CountryInfoCard;
