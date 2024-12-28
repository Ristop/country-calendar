import React from 'react';
import clsx from 'clsx';

export interface FlagProps {
  code: string;
  size?: FlagSize;
}

const flagCache: Map<string, string> = new Map();

const getFlagUrl = (countryCode: string): string => {
  const lowerCaseCode = countryCode.toLowerCase();

  if (!flagCache.has(lowerCaseCode)) {
    const flagUrl: string = require(`../assets/img/flags/4x3/${lowerCaseCode}.svg`);
    flagCache.set(lowerCaseCode, flagUrl);
  }

  return flagCache.get(lowerCaseCode)!;
};

export enum FlagSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

const Flag = ({ code, size = FlagSize.SMALL }: FlagProps) => {
  const flagUrl = getFlagUrl(code.toLowerCase());

  return (
    <div
      className={clsx(`bg-contain bg-center bg-no-repeat relative inline-block rounded`, { 'w-6 min-w-6 h-[18px]': size === FlagSize.SMALL }, { 'min-w-16 w-16 h-12': size === FlagSize.MEDIUM })}
      style={{ backgroundImage: `url(${flagUrl})` }}
    />
  );
};

export default Flag;
