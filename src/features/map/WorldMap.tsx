import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoData from '../../assets/data/world-countries.json';
import { VisitedCountry } from '../../types/VisitedCountry';
import { getCountryColor, getVisitCounts } from './worldMapHelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface WorldMapProps {
  selectedCountries: { [key: string]: VisitedCountry[] };
}

export const WorldMap = ({ selectedCountries }: WorldMapProps) => {
  const visitCounts: { [p: string]: number } = getVisitCounts(selectedCountries);
  const maxVisits = Math.max(...Object.values(visitCounts));
  const highlighted = useSelector((state: RootState) => state.infoCard.highlighted) || [];

  return (
    <div className="mx-auto" id="world-map">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 128 }}>
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.id;
              const visitCount = visitCounts[countryCode] || 0;
              const highlightActive = highlighted.length !== 0;
              const isHighlighted = highlighted.includes(countryCode);
              const isHomeCountry = selectedCountries[Object.keys(selectedCountries)[0]]?.[0]?.alpha2 === countryCode;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColor(visitCount, maxVisits, isHomeCountry, isHighlighted, highlightActive)}
                  stroke="#FFFFFF"
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: getCountryColor(visitCount + 1, maxVisits, isHomeCountry, isHighlighted, highlightActive),
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
