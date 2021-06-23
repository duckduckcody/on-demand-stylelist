import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { KeyboardEvent, ReactElement } from 'react';
import {
  FloatingCloseIcon,
  FloatingSearchIcon,
  SearchInput,
} from './SearchHeader.styles';

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearch: VoidFunction;
  onCancelSearch: VoidFunction;
}

export const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  onCancelSearch,
}: Props): ReactElement => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onSearch();
    e.key === 'Escape' && onCancelSearch();
  };

  return (
    <>
      <SearchInput
        autoFocus
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)}
        placeholder='Search styles...'
      />
      <FloatingCloseIcon icon={faTimes} onClick={onCancelSearch} />
      <FloatingSearchIcon icon={faSearch} onClick={onSearch} />
    </>
  );
};
