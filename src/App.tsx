import React, { useEffect, useState } from 'react';
import './App.scss';
import { useSearchParams } from 'react-router-dom';
import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import TimeLine from './TimeLine';
import Summary from './Summary';
import CountriesSearch from './CountriesSearch';
import { getCountriesFromParams, getFirstVisited } from './helper';

export interface CountriesByYear {
  [year: number]: CountryInfo[];
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

  useEffect(() => {
    Object.entries(selectedCountries).forEach(([year, countries]) => {
      if (countries.length === 0) {
        searchParams.delete(year);
      } else {
        searchParams.set(year.toString(), countries.map((c: CountryInfo) => c.code).join(''));
      }
    });
    setSearchParams(searchParams);
  }, [selectedCountries]);

  const dragEndHandler = (e: DragEndEvent) => {
    // Check if item is drag into unknown area
    if (!e.over || !e.active.data.current || !e.over.data.current) return;

    // Check if item position is the same
    if (e.active.id === e.over.id) return;

    // Check if item is moved outside of the column
    if (e.active.data.current.sortable.containerId !== e.over.data.current.sortable.containerId) return;

    // Sort the items list order based on item target position
    const containerName = e.active.data.current.sortable.containerId;
    setSelectedCountries((taskList) => {
      const temp = { ...taskList };
      if (!e.over) return temp;
      const oldIdx = temp[containerName].findIndex((c) => c.id === e.active.id.toString());
      // @ts-ignore
      const newIdx = temp[containerName].findIndex((c) => c.id === e.over.id.toString());
      temp[containerName] = arrayMove(temp[containerName], oldIdx, newIdx);
      return temp;
    });
  };

  const dragOverHandler = (e: DragOverEvent) => {
    // Check if item is drag into unknown area
    if (!e.over) return;

    // Get the initial and target sortable list name
    const initialContainer = e.active.data.current?.sortable?.containerId;
    const targetContainerTmp = e.over.id.toString();

    if (targetContainerTmp.length != 4) return;

    const targetContainer = parseInt(targetContainerTmp);

    // if there are none initial sortable list name, then item is not sortable item
    if (!initialContainer) return;

    // Order the item list based on target item position
    setSelectedCountries((taskList) => {
      const temp = { ...taskList };

      // // If there are no target container then item is moved into a droppable zone
      // // droppable = whole area of the sortable list (works when the sortable list is empty)
      if (!targetContainer) {
        // If item is already there then don't re-added it
        const year = e.over!.id as number;
        if (taskList[year].some((c) => c.id === e.active.id.toString())) return temp;

        const addCont = temp[initialContainer].find((c) => c.id == e.active.id.toString())!;

        // Remove item from it's initial container
        temp[initialContainer] = temp[initialContainer].filter((task) => task.id !== e.active.id.toString());

        // console.log('Adding ' + addCont + ' to ' + year);

        // Add item to it's target container which the droppable zone belongs to
        temp[year].push(addCont);

        return temp;
      }

      // If the item is drag around in the same container then just reorder the list
      if (initialContainer.toString() === targetContainer.toString()) {
        const oldIdx = temp[initialContainer].findIndex((c) => c.id == e.active.id.toString());
        const newIdx = temp[initialContainer].findIndex((c) => c.id == e.over!.id.toString());

        // console.log('Reordering ' + oldIdx + ' to ' + newIdx);

        temp[initialContainer] = arrayMove(temp[initialContainer], oldIdx, newIdx);
      } else {
        // If the item is drag into another different container
        const countryItem = temp[initialContainer]?.find((c) => c.id == e.active.id.toString());

        if (countryItem) {
          // console.log('Moving ' + countryItem.name + ' from ' + initialContainer + ' to ' + targetContainer);

          // Remove item from its initial container
          temp[initialContainer] = temp[initialContainer].filter((task) => task.id !== e.active.id.toString());

          // Add item to it's target container
          const newIdx = temp[targetContainer].findIndex((c) => c.id == e.over!.id.toString());
          temp[targetContainer].splice(newIdx, 0, countryItem);
        } else {
          // console.log('Moving to ' + targetContainer);

          const newIdx = temp[targetContainer].findIndex((c) => c.id == e.over!.id.toString());
          temp[targetContainer].splice(newIdx, 0, {
            id: e.active.id.toString(),
            // @ts-ignore
            name: e.active.data.current.name,
            // @ts-ignore
            code: e.active.data.current.code,
          });
        }
      }

      return temp;
    });
  };

  return (
    <DndContext onDragEnd={dragEndHandler} onDragOver={dragOverHandler}>
      <CountriesSearch />
      <Summary firstVisited={firstVisited} />
      <TimeLine years={years} countries={selectedCountries} firstVisited={firstVisited} />
    </DndContext>
  );
};

export default App;
