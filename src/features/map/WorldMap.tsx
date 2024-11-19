import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoData from '../../assets/data/world-countries.json';
import './WorldMap.scss';
import { CountryInfo } from '../../types/CountryInfo';
import { getVisitColor, getVisitCounts } from './worldMapHelper';

interface WorldMapProps {
  selectedCountries: { [key: string]: CountryInfo[] };
}

export const WorldMap = ({ selectedCountries }: WorldMapProps) => {
  const visitCounts = getVisitCounts(selectedCountries);

  return (
    <div className='world-map'>
      <ComposableMap
        projection='geoMercator'
        projectionConfig={{
          scale: 128,
        }}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.properties['Alpha-2'];
              const visitCount = visitCounts[countryCode] || 0;
              const isVisited = visitCount > 0;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isVisited ? getVisitColor(visitCount) : '#D6D6DA'}
                  stroke='#FFFFFF'
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: isVisited ? getVisitColor(visitCount + 1) : '#C0C0C4',
                      outline: 'none',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};
