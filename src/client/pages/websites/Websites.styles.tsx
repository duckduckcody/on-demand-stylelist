import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { MOBILE_BREAKPOINT } from '../../styleConstants';

export const Container = styled.div`
  margin: 12px 24px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 12px 8px 0;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.4rem;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0 12px 0 0;
  font-size: 24px;
  width: 24px;
`;

export const WebsitesContainer = styled.div`
  margin: 14px 0 8px 0;

  display: grid;
  grid-template-rows: repeat(auto-fit, auto);
  grid-row-gap: 10px;
`;

export const WebsiteContainer = styled.label<{ selected: boolean }>`
  box-shadow: ${(p) =>
    p.selected ? `0 0 0 4px ${p.theme.highlight}` : `0 0 0 1px papayawhip`};
  padding: 14px 24px;
  border-radius: 10px;
  cursor: pointer;

  display: grid;
  align-items: center;
  grid-template-columns: 55px 1fr 30px;
  grid-template-areas: 'favicon textContainer checkbox';
  grid-gap: 15px;

  &:hover {
    background-color: ${(p) => p.theme.headerBackgroundColor};
  }
`;

export const Favicon = styled.img`
  grid-area: favicon;
  width: 100%;
`;

export const WebsiteTextContainer = styled.div`
  grid-area: textContainer;

  display: grid;
  align-items: center;
  grid-template-areas:
    'websiteName'
    'websiteTags'
    'websiteDescription';
`;

export const WebsiteName = styled.span`
  grid-area: websiteName;
  font-size: 1.25rem;
  font-weight: bold;
`;

export const WebsiteDescription = styled.span`
  grid-area: websiteDescription;
  font-size: 1rem;
`;

export const WebsiteTags = styled.span`
  grid-area: websiteTags;
  font-size: 0.9rem;
`;

export const WebsiteCheckBox = styled(Checkbox)`
  grid-area: checkbox;
  width: 100%;
  height: 100%;
  margin: 0;
`;

export const ContinueContainer = styled.div`
  float: right;
`;

export const DoneButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 8px 48px;
  border-radius: 10px;
  color: ${(p) => p.theme.textColor};
  background-color: ${(p) => p.theme.highlight};
`;
