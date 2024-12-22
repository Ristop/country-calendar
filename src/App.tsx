import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { getCountriesFromParams, getFirstVisited } from './helper';
import { v4 as uuidv4 } from 'uuid';
import { CountryInfo } from './types/CountryInfo';
import CountryLabel from './components/CountryLabel';
import { WorldMap } from './features/map/WorldMap';
import TimeLine from './features/calendar/TimeLine';
import Summary from './features/summary/Summary';
import { CountriesByYear } from './types/CountriesByYear';
import Navbar from './features/navbar/Navbar';
import { snapCenterToCursor } from '@dnd-kit/modifiers';

export const TRASH_ID = 'trash';
export const SEARCH_RESULT_ID = 'Sortable';

const App = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [startYear, setStartYear] = useState<number>(Number(searchParams.get('start')) || 1995);
  const [selectedCountries, setSelectedCountries] = useState<CountriesByYear>({});
  const [activeCountry, setActiveCountry] = useState<CountryInfo | null>();
  const [navbarRegenKey, setNavbarRegenKey] = useState<number>(Date.now());

  useEffect(() => {
    searchParams.set('start', startYear.toString());
    const endYear = new Date().getFullYear();
    const years = Array.from({ length: endYear - Number(startYear) + 1 }, (_, i) => i + Number(startYear));
    setSelectedCountries(getCountriesFromParams(years, searchParams));
    setSearchParams(searchParams);
  }, [startYear]);

  useEffect(() => {
    Object.entries(selectedCountries).forEach(([year, countries]) => {
      if (countries.length === 0) {
        searchParams.delete(year);
      } else {
        searchParams.set(
          year.toString(),
          countries
            .map((c: CountryInfo) => c.code)
            .join('')
            .toLowerCase()
        );
      }
    });
    setSearchParams(searchParams);
  }, [selectedCountries]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveCountry({
      id: active.id.toString(),
      name: active.data.current!.name,
      code: active.data.current!.code,
    });
  };

  const dragEndHandler = ({ over, active }: DragEndEvent) => {
    setActiveCountry(null);

    const activeId = active.id as string;
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const containerName = active.data.current!.sortable.containerId;

    if (Object.keys(selectedCountries).includes(containerName)) {
      if (overId === TRASH_ID) {
        setSelectedCountries((prevCountries) => ({
          ...prevCountries,
          [containerName]: prevCountries[containerName].filter((c) => c.id !== activeId),
        }));
        setNavbarRegenKey(Date.now());
        return;
      }

      // Sort the items list order based on item target position
      setSelectedCountries((prevCountries) => {
        const temp = { ...prevCountries };
        if (!over) return temp;
        const oldIdx = temp[containerName].findIndex((c) => c.id === activeId);
        if (activeId.startsWith('new_')) {
          temp[containerName][oldIdx].id = uuidv4();
        }
        const newIdx = temp[containerName].findIndex((c) => c.id === overId);
        temp[containerName] = arrayMove(temp[containerName], oldIdx, newIdx);
        return temp;
      });
      setNavbarRegenKey(Date.now());
    }
  };

  function getActiveContainerId(countryId: string): string | undefined {
    for (const [key, val] of Object.entries(selectedCountries)) {
      if (val.map((v) => v.id).includes(countryId)) {
        return key;
      }
    }
    if (countryId.startsWith('new_')) {
      return SEARCH_RESULT_ID;
    }
  }

  const dragOverHandler = ({ over, active }: DragOverEvent) => {
    const activeCountryId = active.id;
    const activeContainer = getActiveContainerId(activeCountryId.toString());

    const overCountryId = over?.data?.current?.sortable?.containerId === undefined ? undefined : over?.id;
    const overContainer = over?.data?.current?.sortable?.containerId || over?.id;

    if (!overContainer || !activeContainer || overContainer === TRASH_ID || overContainer === SEARCH_RESULT_ID) {
      return;
    }

    setSelectedCountries((prevCountries) => {
      const temp = { ...prevCountries };

      if (activeContainer === SEARCH_RESULT_ID) {
        const newCountryInfo = {
          id: activeCountryId.toString(),
          name: active.data.current!.name,
          code: active.data.current!.code,
        };
        const findIndex = temp[overContainer].findIndex((c) => c.id === overCountryId);
        temp[overContainer].splice(findIndex, 0, newCountryInfo);
      } else {
        const activeCountryInfo = temp[activeContainer].find((c) => c.id === activeCountryId)!;
        if (
          activeCountryInfo &&
          (activeContainer !== overContainer || (overCountryId && overCountryId !== activeCountryId))
        ) {
          const hoverIndex = overCountryId
            ? temp[overContainer].findIndex((c) => c.id === overCountryId)
            : temp[overContainer].length;
          temp[activeContainer] = temp[activeContainer].filter((c) => c.id !== activeCountryId);
          temp[overContainer].splice(hoverIndex, 0, activeCountryInfo);
        }
      }

      return temp;
    });
  };

  const firstVisited = getFirstVisited(selectedCountries);
  const navbar = useMemo(
    () => (
      <Navbar
        expanded={expanded}
        dragInProgress={!!activeCountry}
        setExpanded={setExpanded}
        regenKey={navbarRegenKey}
      />
    ),
    [expanded, activeCountry]
  );

  return (
    <div className='container'>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={dragEndHandler}
        onDragOver={dragOverHandler}
        autoScroll={{ layoutShiftCompensation: false, enabled: false }}
        modifiers={[snapCenterToCursor]}
        collisionDetection={pointerWithin}
      >
        {navbar}
        <div className={'main-content ' + (expanded ? ' expanded' : '')}>
          <Summary firstVisited={firstVisited} dragInProcess={!!activeCountry} />
          <TimeLine countries={selectedCountries} firstVisited={firstVisited} setStartYear={setStartYear} />
          <DragOverlay>
            {activeCountry && (
              <CountryLabel
                key={activeCountry.id}
                country={activeCountry}
                variant={firstVisited.includes(activeCountry) ? 'primary' : 'secondary'}
              />
            )}
          </DragOverlay>
          <WorldMap selectedCountries={selectedCountries} />
        </div>
      </DndContext>
    </div>
  );
};

export default App;
