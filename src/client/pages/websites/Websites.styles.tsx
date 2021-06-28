import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../styleConstants';

export const Container = styled.div`
  margin: 12px 24px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 12px 8px 0;
  }
`;

export const WebsitesContainer = styled.div`
  margin: 12px 0 4px;
  display: flex;
  flex-flow: column nowrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 12px 0 12px;
  }
`;

export const WebsiteText = styled.label`
  margin: 2px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 5px 0;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.25rem;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0 4px 0 0;
  font-size: 18px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 0 8px 0 0;
    flex: 0 0 1.5rem;
  }
`;
