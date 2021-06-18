import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Website } from '../../../websites';
import { Icon } from '../../components/Icon';
import { useSelectedWebsites } from '../../hooks/useSelectedWebsites';
import { Container, InfoContainer, WebsitesContainer } from './Websites.styles';

export interface WebsitesProps {
  websites: Website[];
}

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
      <InfoContainer>
        <Icon icon={faInfoCircle} margin={'0 4px 0 0'} />
        <span>Control which websites clothes are gathered from below</span>
      </InfoContainer>
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
