import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Website } from '../../../websites';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { useSelectedWebsites } from '../../hooks/useSelectedWebsites';
import {
  Container,
  DoneButton,
  Favicon,
  InfoContainer,
  StyledIcon,
  WebsiteCheckBox,
  WebsiteContainer,
  WebsiteDescription,
  WebsiteName,
  WebsitesContainer,
  WebsiteTags,
  WebsiteTextContainer,
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
      selectedWebsites && selectedWebsites.length === 0
        ? setOnBoardMode(true)
        : setOnBoardMode(false),
    [selectedWebsites]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event', event, selectedWebsites);
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
          <WebsiteContainer
            key={website.id}
            selected={
              selectedWebsites
                ? selectedWebsites.includes(`${website.id}`)
                : false
            }
          >
            <Favicon src={website.favicon} />

            <WebsiteTextContainer>
              <WebsiteName>{website.name}</WebsiteName>
              <WebsiteTags>
                {website.tags.map(
                  (tag, index) =>
                    `${tag}${index === website.tags.length - 1 ? '.' : ', '}`
                )}
              </WebsiteTags>
              <WebsiteDescription>{website.description}</WebsiteDescription>
            </WebsiteTextContainer>

            <WebsiteCheckBox
              value={website.id}
              checked={
                selectedWebsites
                  ? selectedWebsites.includes(`${website.id}`)
                  : false
              }
              onChange={handleInputChange}
            />
          </WebsiteContainer>
        ))}
      </WebsitesContainer>
      {onBoardMode && <p>Please select at least one website</p>}
      {!onBoardMode && (
        <DoneButton onClick={() => router.back()}>Done</DoneButton>
      )}
    </Container>
  );
};
