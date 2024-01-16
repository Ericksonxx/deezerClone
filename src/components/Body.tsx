import { useSearchContext } from '../context/SearchContext';
import { SearchResultItem } from './Header';

//images
import PlayButton from '../img/play.png'


export function Body() {
  const { searchResults, setPlaying, searchedText } = useSearchContext();

  // current clicked song to context
  const handlePlayButtonClick = (item:SearchResultItem) => {
    setPlaying(item);
    console.log(item)
  };

  return (
    <div>
      {searchResults &&
        <div>
           <div className='text-left p-12'>
                <p className='text-2xl font-light'>Search results for:  <span className='font-semibold mr-2'>{searchedText}</span></p>
           </div>
           <div className='px-12 md:grid md:grid-cols-4 gap-6'>
           {searchResults.map((item, index) => {
              if (item.type === 'track') {
                const containerStyle = {
                  height: '20vw', 
                  width: '20vw',
                };

                const backgroundImageStyle = {
                  backgroundImage: `url(${item.album.cover_medium})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                };

                return (
                  <div className='z-10 relative overflow-hidden group' style={containerStyle} key={index}>
                    <div className='rounded rounded-xl absolute inset-0 bg-gradient-to-b from-transparent group-hover:from-20% from-60% via-black to-black p-4 text-white'>
                      <div className='text-left w-full h-full flex flex-col justify-end'>
                        <p className='font-semibold'>{item.title}</p>
                        <p className='font-light'>{item.artist.name}</p>
                        <p className='font-light'>{item.album.title}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayButtonClick(item)}
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 focus:outline-none'
                      style={{ zIndex: 1000 }}
                    >
                      <img className='w-12 h-12 z-20' alt="Play Button" src={PlayButton} />
                    </button>
                    <div style={backgroundImageStyle} className='rounded rounded-xl absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-0' />
                      <img className='w-full h-full object-cover rounded rounded-xl transition-opacity duration-300' src={item.album.cover_medium} alt={item.title} />
                    </div>
                );
          }
          return null;
        })}
           </div>
        </div>
      }
    </div>
  );
}
