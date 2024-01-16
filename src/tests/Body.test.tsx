import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchProvider, useSearchContext } from '../context/SearchContext';
import { Body } from '../components/Body';

// search results
const mockSearchResults = [
  {
    id: 1,
    title: 'Song 1',
    artist: { name: 'Artist 1' },
    album: { title: 'Album 1', cover_medium: 'cover1.jpg' },
    type: 'track',
  },
];

// mock useSearchContext
jest.mock('../context/SearchContext', () => ({
  ...jest.requireActual('../context/SearchContext'),
  useSearchContext: jest.fn(),
}));

describe('Body Component', () => {
  it('renders search results correctly', () => {
    // useSearchContext values
    (useSearchContext as jest.Mock).mockReturnValue({
      searchResults: mockSearchResults,
      setPlaying: jest.fn(),
      searchedText: 'Search Text',
    });

    render(
      <SearchProvider>
        <Body />
      </SearchProvider>
    );

    // check results rendered
    expect(screen.getByText('Search results for:')).toBeInTheDocument();
    expect(screen.getByText('Search Text')).toBeInTheDocument();
    expect(screen.getByText('Song 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Album 1')).toBeInTheDocument();
  });

  it('calls setPlaying when play button is clicked', () => {
    const setPlayingMock = jest.fn();

    (useSearchContext as jest.Mock).mockReturnValue({
      searchResults: mockSearchResults,
      setPlaying: setPlayingMock,
      searchedText: 'Search Text',
    });

    render(
      <SearchProvider>
        <Body />
      </SearchProvider>
    );

    // click play 
    fireEvent.click(screen.getByAltText('Play Button'));

    // setPlaying was called with the correct item
    expect(setPlayingMock).toHaveBeenCalledWith(mockSearchResults[0]);
  });
});
