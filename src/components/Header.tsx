import React, { useState } from 'react';
import logo from '../img/logo.png'
import { useSearchContext } from '../context/SearchContext';

//import functions
import {getFromArtist} from '../functions/ApiFunctions'

//images
import User from '../img/user.png'
import Search from '../img/search.png'

interface Artist {
    name: string,
    id: number,
    picture: string,
}

interface Album {
    id: number, 
    title: string,
    cover_medium: string,
}

export interface SearchResultItem {
    id:number,
    rank:number,
    duration: number, 
    explicit: boolean,
    link: string,
    preview:string,
    readable: boolean,
    title: string,
    type: string,
    artist: Artist,
    album: Album
  }

export function Header() {
  const [searchText, setSearchText] = useState<string>('');
  const { setSearchResults } = useSearchContext();
  const { setSearchedText } = useSearchContext();

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const results = await getFromArtist(searchText);
      //populate global context
      setSearchResults(results.data);
      setSearchedText(searchText);
    }
  };

  return (
    <div className='py-4 px-10 grid grid-cols-3 shadow shadow-lg items-center'>
      <div className='col-span-2 flex items-center'>
        <img className='w-[100px] md:w-[180px] mr-4 md:mr-12' src={logo} />
          <div className=' w-full md:w-[80%] max-w-[800px] flex'>
            <input 
              data-testid="outlined-search"
              className='w-full h-10 border px-12 h-12 rounded rounded-lg outline-none'
              id="outlined-search" 
              onChange={(e) => setSearchText(e.target.value)} 
              type="search" 
              onKeyDown={handleSearch}
            />
            <img className='absolute ml-2 top-[22px] pointer-events-none' src={Search} />
          </div>
      </div>
      <div className='hidden md:block flex'>
        <div className='flex items-center justify-end'>
          <a className='mx-2'>Home</a>
          <a className='mx-2 text-[#EF5466]'>Discover</a>
          <a className='mx-2'>Recents</a>
          <a className='mx-2'>Library</a>
          <div className='ml-4'>
            <img className='w-10' src={User}  />
          </div>
        </div>
      </div>
    </div>
  );
}
