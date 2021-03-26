import { GetStaticProps } from 'next';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { StaticSafeWebsite, staticSafeWebsites } from '../src/api/constants';
import { LocalStorageKey } from '../src/constants';

export const getStaticProps: GetStaticProps = async () => ({
  props: { websites: staticSafeWebsites },
});

interface Props {
  websites: StaticSafeWebsite[];
}

const StyledButton = styled.button`
  margin: 16px 0;
`;

export default function Websites({ websites }: Props): ReactElement {
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);
  const [onBoardMode, setOnBoardMode] = useState(false);

  useEffect(() => {
    if (process.browser) {
      const websites = JSON.parse(
        window.localStorage.getItem(LocalStorageKey.Websites) ?? '[]'
      );
      websites.length && setSelectedWebsites(websites);
      !websites.length && setOnBoardMode(true);
    }
  }, []);

  useEffect(
    () =>
      window.localStorage.setItem(
        LocalStorageKey.Websites,
        JSON.stringify(selectedWebsites)
      ),
    [selectedWebsites]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setOnBoardMode(false);
      const cat = selectedWebsites.concat(event.target.value);
      setSelectedWebsites(cat);
    } else {
      const filtered = selectedWebsites.filter(
        (website) => website !== event.target.value
      );
      setSelectedWebsites(filtered);
      filtered.length === 0 && setOnBoardMode(true);
    }
  };

  return (
    <>
      {websites.map((website) => (
        <div key={website.id}>
          <label>{website.name}</label>
          <input
            type='checkbox'
            value={website.id}
            checked={selectedWebsites.includes(`${website.id}`)}
            onChange={handleInputChange}
          />
        </div>
      ))}
      {onBoardMode && <p>Please select at least one website</p>}
      {!onBoardMode && (
        <Link href='/'>
          <StyledButton>Categories</StyledButton>
        </Link>
      )}
    </>
  );
}
