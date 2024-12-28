import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';
import CountryLabel, { CountryLabelProps } from '../../../components/CountryLabel';

const DraggableCountryLabel = (props: CountryLabelProps) => {
  const { country } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: country.id,
    data: { name: country.name, code: country.code },
  });

  return <div
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    style={{
      transform: CSS.Translate.toString(transform),
    }}
    className={'[touch-action:none]'}
  >
    <CountryLabel {...props} className="cursor-grab" />
  </div>;
};

export default DraggableCountryLabel;
