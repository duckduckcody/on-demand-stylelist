import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { websiteData, WebsiteData } from '../src/api/constants';
import { LocalStorageKey } from '../src/constants';
import { useWindow } from '../src/util/useWindow';

export const getStaticProps: GetStaticProps = async () => ({
  props: { websites: websiteData },
});

interface Props {
  websites: WebsiteData[];
}

const StyledButton = styled.button`
  margin: 16px 0;
`;

export default function Websites({ websites }: Props): ReactElement {
  const router = useRouter();
  const window = useWindow();
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);
  const [onBoardMode, setOnBoardMode] = useState(false);

  useEffect(() => {
    const websites = JSON.parse(
      window?.localStorage.getItem(LocalStorageKey.Websites) ?? '[]'
    );
    websites.length && setSelectedWebsites(websites);
    !websites.length && setOnBoardMode(true);
  }, [window?.localStorage]);

  useEffect(
    () =>
      window?.localStorage.setItem(
        LocalStorageKey.Websites,
        JSON.stringify(selectedWebsites)
      ),
    [selectedWebsites, window?.localStorage]
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
        <StyledButton onClick={() => router.back()}>Save</StyledButton>
      )}
    </>
  );
}
