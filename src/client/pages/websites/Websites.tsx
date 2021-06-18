import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Website } from '../../../websites';
import { useSelectedWebsites } from '../../hooks/useSelectedWebsites';

export interface WebsitesProps {
  websites: Website[];
}

const Container = styled.div`
  margin: 12px 24px 0;
`;

const WebsitesContainer = styled.div`
  margin: 0 0 8px;
`;

export const Websites = ({ websites }: WebsitesProps): ReactElement => {
  const router = useRouter();
  const { selectedWebsites, setSelectedWebsites } = useSelectedWebsites();
  const [onBoardMode, setOnBoardMode] = useState(false);

  useEffect(
    () =>
      !selectedWebsites.length ? setOnBoardMode(true) : setOnBoardMode(false),
    [selectedWebsites.length]
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
    <Container>
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
      </WebsitesContainer>
      {onBoardMode && <p>Please select at least one website</p>}
      {!onBoardMode && <button onClick={() => router.back()}>Done</button>}
    </Container>
  );
};
