import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from 'react';
import {
  FloatingCloseIcon,
  FloatingSearchIcon,
  SearchInput,
} from './SearchHeader.styles';

interface Props {
  searchQuery: string | undefined;
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
  return (
    <>
      <SearchInput
        autoFocus
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder='Search styles...'
      />
      <FloatingCloseIcon icon={faTimes} onClick={onCancelSearch} />
      <FloatingSearchIcon icon={faSearch} onClick={onSearch} />
    </>
  );
};
