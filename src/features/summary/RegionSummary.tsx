import React from 'react';
import { VisitedCountry } from '../../types/VisitedCountry';
import Metric from './Metric';
import { regions } from '../../helper';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setHighLighted } from '../../store/slices/infoCardSlice';

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
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex-col flex-wrap justify-evenly md:flex-row flex mx-auto">
      {Object.entries(regions).map(([region, allRegionCountries]) => {
        const visitedInRegion = regionInfo[region]?.length || 0;
        return (<Metric
          metric={visitedInRegion} total={allRegionCountries.length}
          description={region}
          key={region}
          onMouseEnter={() => dispatch(setHighLighted(allRegionCountries.map(c => c.alpha3)))}
          onMouseLeave={() => dispatch(setHighLighted([]))}
        />);
      })}
    </div>
  );
};

export default RegionSummary;
