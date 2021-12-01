import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../../styles";

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  border: none;
  padding: 0 calc(5px + 1.5rem + 12px + 1.5rem + 24px) 0 24px;

  &::placeholder {
    color: rgba(55, 55, 55, 0.66);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 1.5rem;
    padding: 0 calc(8px + 1.25rem + 12px + 1.25rem + 8px) 0 8px;
  }
`;

const FloatingIcon = styled(FontAwesomeIcon)`
  color: #181818;
  position: absolute;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 1.25rem;
  }
`;

export const FloatingCloseIcon = styled(FloatingIcon)`
  right: calc(12px + 1.5rem + 24px);
  bottom: calc(50% - (1.5rem / 2));

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    right: calc(12px + 1.25rem + 8px);
  }
`;

export const FloatingSearchIcon = styled(FloatingIcon)`
  right: 24px;
  bottom: calc(50% - (1.5rem / 2));

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    right: 8px;
  }
`;
