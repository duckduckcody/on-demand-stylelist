import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LocalStorageKey } from '../../constants';
import { useWindow } from '../../util/useWindow';
import { WebsiteData } from '../../websites';

interface Props {
  websites: WebsiteData[];
}

const WebsitesContainer = styled.div`
  margin: 12px 24px 0;
`;

const StyledButton = styled.button`
  margin: 16px 0;
`;

export const Websites = ({ websites }: Props): ReactElement => {
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
    <WebsitesContainer>
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
        <StyledButton onClick={() => router.back()}>Done</StyledButton>
      )}
    </WebsitesContainer>
  );
};
