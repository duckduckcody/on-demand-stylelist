import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Website } from '../../../websites';
import { useSelectedWebsites } from '../../hooks/useSelectedWebsites';
import {
  Container,
  InfoContainer,
  StyledIcon,
  WebsitesContainer,
  WebsiteText,
} from './Websites.styles';

export interface WebsitesProps {
  websites: Website[];
}

export const Websites = ({ websites }: WebsitesProps): ReactElement => {
  const router = useRouter();
  const { selectedWebsites, setSelectedWebsites } = useSelectedWebsites();
  const [onBoardMode, setOnBoardMode] = useState(false);

  useEffect(
    () =>
      selectedWebsites && selectedWebsites.length === 0 ? setOnBoardMode(true) : setOnBoardMode(false),
    [selectedWebsites]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedWebsites) {
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
    }

  };

  return (
    <Container>
      <InfoContainer>
        <StyledIcon icon={faInfoCircle} />
        <span>
          Stylelist gathers clothes from Australian clothing websites and brings
          them to one list.
          <br />
          Control which websites clothes are gathered from below.
        </span>
      </InfoContainer>
      <WebsitesContainer>
        {websites.map((website) => (
          <WebsiteText key={website.id}>
            <input
              type='checkbox'
              value={website.id}
              checked={selectedWebsites && selectedWebsites.includes(`${website.id}`)}
              onChange={handleInputChange}
            />
            {website.name}
          </WebsiteText>
        ))}
      </WebsitesContainer>
      {onBoardMode && <p>Please select at least one website</p>}
      {!onBoardMode && <button onClick={() => router.back()}>Done</button>}
    </Container>
  );
};
