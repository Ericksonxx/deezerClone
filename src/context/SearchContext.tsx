import React, { createContext, useContext, ReactNode, useState } from 'react';
import {SearchResultItem} from '../components/Header'

interface SearchContextProps {
  searchResults: SearchResultItem[] | null;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResultItem[] | null>>;
  searchedText: String | undefined;
  setSearchedText: React.Dispatch<React.SetStateAction<String | undefined>>;
  playing: SearchResultItem | null;
  setPlaying: React.Dispatch<React.SetStateAction<SearchResultItem | null>>;
  volume: Number | null;
  setVolume: React.Dispatch<React.SetStateAction<Number | null>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[] | null>(null);
  const [searchedText, setSearchedText] = useState<String | undefined>();
  const [playing, setPlaying] = useState<SearchResultItem | null>(null);
  const [volume, setVolume] = useState<Number | null>(0)

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, searchedText, setSearchedText, playing, setPlaying, volume, setVolume }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('You forgot the SearchProvider!');
  }

  return context;
};
