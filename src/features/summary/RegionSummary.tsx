import React from 'react';
import { CountryInfo } from '../../types/CountryInfo';
import Metric from './Metric';
import { regions } from '../../helper';

export interface YearContainerProps {
  firstVisited: CountryInfo[];
}

const RegionSummary = ({ firstVisited }: YearContainerProps) => {
  const regionInfo = firstVisited.reduce((acc: { [region: string]: CountryInfo[] }, country) => {
    if (acc[country.country.region]) {
      acc[country.country.region].push(country);
    } else {
      acc[country.country.region] = [country];
    }
    return acc;
  }, {});

  return (
    <div className="flex-col flex-wrap justify-evenly md:flex-row flex mx-auto">
      {Object.entries(regions).map(([region, totalCount]) => {
        const visitedInRegion = regionInfo[region]?.length || 0;
        return (<Metric metric={visitedInRegion} total={totalCount} description={region} key={region} />);
      })}
    </div>
  );
};

export default RegionSummary;
