import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoData from '../../assets/data/world-countries.json';
import { VisitedCountry } from '../../types/VisitedCountry';
import { getVisitColor, getVisitCounts } from './worldMapHelper';

interface WorldMapProps {
  selectedCountries: { [key: string]: VisitedCountry[] };
}

export const WorldMap = ({ selectedCountries }: WorldMapProps) => {
  const visitCounts: { [p: string]: number } = getVisitCounts(selectedCountries);
  const maxVisits = Math.max(...Object.values(visitCounts));

  return (
    <div className='mx-auto' id='world-map'>
      <ComposableMap
        projection='geoMercator'
        projectionConfig={{ scale: 128 }}
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.properties['Alpha-2'];
              const visitCount = visitCounts[countryCode] || 0;
              const isVisited = visitCount > 0;
              const isHomeCountry = selectedCountries[Object.keys(selectedCountries)[0]]?.[0]?.code === countryCode;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isVisited ? (isHomeCountry ? '#75c17c'  : getVisitColor(visitCount, maxVisits)) : '#D6D6DA'}
                  stroke='#FFFFFF'
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: isVisited ? getVisitColor(visitCount + 1, maxVisits) : '#C0C0C4',
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
