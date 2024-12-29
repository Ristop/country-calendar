import React from 'react';
import Flag, { FlagSize } from '../../components/Flag';
import { CountryMin } from '../../helper';
import InfoCardMetric from './InfoCardMetric';
import { faMapMarkerAlt, faCity, faListNumeric, faCalendarAlt, faHouse, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';


export interface CountryInfoCardProps {
  name: string;
  country: CountryMin;
  numOfVisits: number;
  nthVisit: number;
  firstVisit: string;
  lastVisit: string;
  homeCountry: boolean;
}

const CountryInfoCard = ({ name, country, numOfVisits, nthVisit, firstVisit, lastVisit, homeCountry }: CountryInfoCardProps) => {
  return (
    <div
      className={`flex flex-col bg-info-card h-[545px] w-96 gap-4 fixed bottom-6 right-6 rounded-lg shadow-2xl drop-shadow-lg p-4 z-10 folded-card`}>
      <div className={'flex gap-4 font-mono'}>
        <Flag code={country.code.toLowerCase()} size={FlagSize.MEDIUM} />
        <div className="mt-auto">
          <div className={'text-2xl font-bold text-base-blue my-auto'}>{name}</div>
          <div>{country.region} / {country.subRegion}</div>
        </div>
      </div>
      <div className='w-full h-px my-1 bg-main-border' />
      <div className="flex flex-wrap">
        {homeCountry && <InfoCardMetric icon={faHouse} metric={'Home country'} description={''} size='large' />}
        {!homeCountry && <>
          <InfoCardMetric icon={faMapMarkerAlt} metric={numOfVisits} description={numOfVisits > 1 ? 'visits' : 'visit'} />
          <InfoCardMetric icon={faListNumeric} metric={nthVisit} description={'th country'} />
          <InfoCardMetric icon={faCalendarAlt} metric={firstVisit} description={'first visit'} />
          <InfoCardMetric icon={faCalendarAlt} metric={lastVisit} description={'last visit'} />
        </>}
        <InfoCardMetric icon={faMoneyBillAlt} metric={country.currency.name} description={country.currency.symbol} size="large" />
        <InfoCardMetric icon={faCity} metric={country.capital.join(', ')} description={'Capital'} size="large" />
      </div>
    </div>
  );
};

export default CountryInfoCard;
