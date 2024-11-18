import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoData from '../../assets/data/world-countries.json';
import './WorldMap.scss';
import { CountryInfo } from '../../types/CountryInfo';
interface WorldMapProps {
  selectedCountries: { [key: string]: CountryInfo[] };
}

const getVisitColor = (visitCount: number): string => {
  // Base color: #28536b
  const baseColor = { r: 55, g: 85, b: 108 };

  // Darken the color based on visit count (max darkness at 5 visits)
  const darkenFactor = Math.min(visitCount, 5) / 5;

  const r = Math.floor(baseColor.r * (1 - darkenFactor * 0.7));
  const g = Math.floor(baseColor.g * (1 - darkenFactor * 0.7));
  const b = Math.floor(baseColor.b * (1 - darkenFactor * 0.7));

  return `rgb(${r}, ${g}, ${b})`;
};

export const WorldMap = ({ selectedCountries }: WorldMapProps) => {
  // Count visits per country
  const visitCounts = Object.values(selectedCountries)
    .flat()
    .reduce(
      (acc, country) => {
        acc[country.code] = (acc[country.code] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );

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
