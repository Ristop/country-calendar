import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import { useSearchParams } from 'react-router-dom';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import TimeLine from './TimeLine';
import Summary from './Summary';
import CountriesSearch from './CountriesSearch';
import { getCountriesFromParams, getFirstVisited } from './helper';
import { createPortal } from 'react-dom';
import CountryLabel from './CountryLabel';
import { v4 as uuidv4 } from 'uuid';

export const TRASH_ID = 'void';

export interface CountriesByYear {
  [year: string]: CountryInfo[];
}

export interface CountryInfo {
  name: string;
  code: string;
  id: string;
}

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startYear = Number(searchParams.get('start')) || 1995;
  const endYear = new Date().getFullYear();
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => i + startYear);
  const initialState = getCountriesFromParams(years, searchParams);
  const [selectedCountries, setSelectedCountries] = useState<CountriesByYear>(initialState);
  const firstVisited = getFirstVisited(selectedCountries);
  const [activeCountry, setActiveCountry] = useState<CountryInfo | null>();

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
        setSelectedCountries((items) => ({
          ...items,
          [containerName]: items[containerName].filter((c) => c.id !== activeId),
        }));
        return;
      }

      // Sort the items list order based on item target position
      setSelectedCountries((countries) => {
        const temp = { ...countries };
        if (!over) return temp;
        const oldIdx = temp[containerName].findIndex((c) => c.id === activeId);
        if (activeId.startsWith('new_')) {
          temp[containerName][oldIdx].id = uuidv4();
        }
        const newIdx = temp[containerName].findIndex((c) => c.id === overId);
        temp[containerName] = arrayMove(temp[containerName], oldIdx, newIdx);
        return temp;
      });
    }
  };

  const dragOverHandler = ({ over, active }: DragOverEvent) => {
    // Check if item is drag into unknown area
    if (!over) return;

    // Get the initial and target sortable list name
    const initialContainer = active.data.current?.sortable?.containerId;
    const overId = over.id.toString();

    if (!Object.keys(selectedCountries).includes(overId)) {
      return;
    }

    // if there are none initial sortable list name, then item is not sortable item
    if (!initialContainer) return;

    // Order the item list based on target item position
    setSelectedCountries((countries) => {
      const temp = { ...countries };

      // // If there are no target container then item is moved into a droppable zone
      // // droppable = whole area of the sortable list (works when the sortable list is empty)
      if (!overId) {
        // If item is already there then don't re-added it
        const year = over!.id as number;
        if (countries[year].some((c) => c.id === active.id.toString())) return temp;

        const addCont = temp[initialContainer].find((c) => c.id == active.id.toString())!;

        // Remove item from it's initial container
        temp[initialContainer] = temp[initialContainer].filter((task) => task.id !== active.id.toString());

        // console.log('Adding ' + addCont + ' to ' + year);

        // Add item to it's target container which the droppable zone belongs to
        temp[year].push(addCont);

        return temp;
      }

      // If the item is drag around in the same container then just reorder the list
      if (initialContainer.toString() === overId.toString()) {
        const oldIdx = temp[initialContainer].findIndex((c) => c.id == active.id.toString());
        const newIdx = temp[initialContainer].findIndex((c) => c.id == over!.id.toString());

        // console.log('Reordering ' + oldIdx + ' to ' + newIdx);

        temp[initialContainer] = arrayMove(temp[initialContainer], oldIdx, newIdx);
      } else {
        // If the item is drag into another different container
        const countryItem = temp[initialContainer]?.find((c) => c.id == active.id.toString());

        if (countryItem) {
          // console.log('Moving ' + countryItem.name + ' from ' + initialContainer + ' to ' + targetContainer);

          // Remove item from its initial container
          temp[initialContainer] = temp[initialContainer].filter((task) => task.id !== active.id.toString());

          // Add item to it's target container
          const newIdx = temp[overId].findIndex((c) => c.id == over!.id.toString());
          temp[overId].splice(newIdx, 0, countryItem);
        } else {
          // console.log('Moving to ' + targetContainer);

          const newIdx = temp[overId].findIndex((c) => c.id == over!.id.toString());
          temp[overId].splice(newIdx, 0, {
            id: active.id.toString(),
            // @ts-ignore
            name: active.data.current.name,
            // @ts-ignore
            code: active.data.current.code,
          });
        }
      }

      return temp;
    });
  };

  const countriesSearch = useMemo(() => <CountriesSearch />, []);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={dragEndHandler} onDragOver={dragOverHandler}>
      {countriesSearch}
      <Summary firstVisited={firstVisited} id={TRASH_ID} dragInProcess={!!activeCountry} />
      <TimeLine years={years} countries={selectedCountries} firstVisited={firstVisited} />
      {createPortal(
        <DragOverlay>
          {activeCountry && (
            <CountryLabel
              key={activeCountry.id}
              country={activeCountry}
              variant={firstVisited.includes(activeCountry) ? 'success' : 'secondary'}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default App;
