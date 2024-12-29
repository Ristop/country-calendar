import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { getCountriesFromParams, getFirstVisited, unMembers } from './helper';
import { v4 as uuidv4 } from 'uuid';
import { CountryInfo } from './types/CountryInfo';
import CountryLabel from './components/CountryLabel';
import { WorldMap } from './features/map/WorldMap';
import TimeLine from './features/calendar/TimeLine';
import Summary from './features/summary/Summary';
import { CountriesByYear } from './types/CountriesByYear';
import Navbar from './features/navbar/Navbar';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import CountryInfoCard from './features/info/CountryInfoCard';
import UserProfileModal from './features/user/UserProfileModal';
import clsx from 'clsx';
import MobileNavigation from './features/moblie-navbar/MobileNavigation';
import RegionSummary from './features/summary/RegionSummary';

export const TRASH_ID = 'trash';
export const SEARCH_RESULT_ID = 'Sortable';

const App = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [startYear, setStartYear] = useState<number | undefined>(
    searchParams.get('start') ? Number(searchParams.get('start')) : undefined
  );
  const [selectedCountries, setSelectedCountries] = useState<CountriesByYear>({});
  const [activeCountry, setActiveCountry] = useState<CountryInfo | null>();
  const [navbarRegenKey, setNavbarRegenKey] = useState<number>(Date.now());
  const [showModal, setShowModal] = useState<boolean>(!startYear);

  const countryInfo = useSelector((state: RootState) => state.app.countryInfo);

  useKeyboardShortcut({ key: 'a', onKeyPressed: () => setExpanded((expanded) => !expanded) });

  useEffect(() => {
    if (startYear) {
      searchParams.set('start', startYear.toString());
      const endYear = new Date().getFullYear();
      const years = Array.from({ length: endYear - Number(startYear) + 1 }, (_, i) => i + Number(startYear));
      setSelectedCountries(getCountriesFromParams(years, searchParams));
      setSearchParams(searchParams);
    }
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
      country: unMembers[active.data.current!.code],
      code: active.data.current!.code,
    });
  };

  const dragEndHandler = ({ over, active }: DragEndEvent) => {
    setActiveCountry(null);

    const activeCountryId = active.id as string;
    const activeContainer = getActiveContainerId(activeCountryId.toString());

    const overCountryId = over?.data?.current?.sortable?.containerId === undefined ? undefined : over?.id;
    const overContainer = over?.data?.current?.sortable?.containerId || over?.id;

    if (!overContainer || !activeContainer) {
      return;
    }

    if (overContainer === TRASH_ID) {
      if (activeContainer !== SEARCH_RESULT_ID) {
        setSelectedCountries((prevCountries) => ({
          ...prevCountries,
          [activeContainer]: prevCountries[activeContainer].filter((c) => c.id !== activeCountryId),
        }));
      }
    } else {
      setSelectedCountries((prevCountries) => {
        const temp = { ...prevCountries };

        const oldIdx = temp[activeContainer].findIndex((c) => c.id === activeCountryId);
        if (activeCountryId.startsWith('new_')) {
          temp[activeContainer][oldIdx].id = uuidv4();
        }
        const newIdx = temp[activeContainer].findIndex((c) => c.id === overCountryId);
        temp[activeContainer] = arrayMove(temp[activeContainer], oldIdx, newIdx);
        return temp;
      });
    }
    setNavbarRegenKey(Date.now());
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
          country: unMembers[active.data.current!.code],
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
        onOpenUserProfile={() => setShowModal((open) => !open)}
      />
    ),
    [expanded, activeCountry]
  );

  const spacer = <div className='w-full h-px my-4 bg-main-border' />;

  return (
    <div className='main-bg'>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={dragEndHandler}
        onDragOver={dragOverHandler}
        autoScroll={{ layoutShiftCompensation: false, enabled: false }}
        modifiers={[snapCenterToCursor]}
        collisionDetection={pointerWithin}
      >
        {navbar}
        <div className={clsx('md:pl-16 main-animation', { 'md:pl-[264px]': expanded })}>
          <div className='w-full max-w-[1600px] mx-auto pt-2 md:px-2'>
            {startYear && (
              <>
                <Summary firstVisited={firstVisited} />
                {spacer}
                <TimeLine countries={selectedCountries} firstVisited={firstVisited} />
                {spacer}
                <RegionSummary firstVisited={firstVisited} />
                {spacer}
                <DragOverlay>
                  {activeCountry && (
                    <CountryLabel
                      key={activeCountry.id}
                      country={activeCountry}
                      variant={firstVisited.includes(activeCountry) ? 'primary' : 'secondary'}
                    />
                  )}
                </DragOverlay>
              </>
            )}
            <WorldMap selectedCountries={selectedCountries} />
          </div>
        </div>
        <MobileNavigation regenKey={navbarRegenKey} />
      </DndContext>
      {countryInfo && (
        <CountryInfoCard
          name={countryInfo.name}
          country={countryInfo.country}
          numOfVisits={
            Object.values(selectedCountries)
              .flat()
              .filter((c) => c.code === countryInfo.code).length
          }
          nthVisit={firstVisited.findIndex((c) => c.code === countryInfo.code) + 1}
          firstVisit={
            Object.entries(selectedCountries).find(([, countries]) =>
              countries.some((c) => c.code === countryInfo.code)
            )![0]
          }
          lastVisit={
            Object.entries(selectedCountries).findLast(([, countries]) =>
              countries.some((c) => c.code === countryInfo.code)
            )![0]
          }
          homeCountry={(startYear && selectedCountries[startYear]?.[0]?.code === countryInfo.code) || false}
        />
      )}
      <UserProfileModal year={startYear} isOpen={showModal} setShowModal={setShowModal} setStartYear={setStartYear} />
    </div>
  );
};

export default App;
