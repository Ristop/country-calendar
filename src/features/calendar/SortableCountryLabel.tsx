import CountryLabel, { CountryLabelProps } from '../../components/CountryLabel';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableCountryLabel = (props: CountryLabelProps) => {
  const { country } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: country.id,
    data: { name: country.name, code: country.code },
  });

  return <div
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    style={{
      transform: CSS.Translate.toString(transform),
      transition: transition,
    }}
    className="grabbable"
  >
    <CountryLabel {...props} />
  </div>;
};

export default SortableCountryLabel;