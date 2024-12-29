import React from 'react';
import { VisitedCountry } from '../../types/VisitedCountry';
import Metric from './Metric';
import { regions } from '../../helper';

interface RegionSummaryProps {
  firstVisited: VisitedCountry[];
}

function getVisitedPerRegion(firstVisited: VisitedCountry[]) {
  return firstVisited.reduce((acc: { [region: string]: VisitedCountry[] }, country) => {
    (acc[country.region] = acc[country.region] || []).push(country);
    return acc;
  }, {});
}

const RegionSummary = ({ firstVisited }: RegionSummaryProps) => {
  const regionInfo = getVisitedPerRegion(firstVisited);

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
