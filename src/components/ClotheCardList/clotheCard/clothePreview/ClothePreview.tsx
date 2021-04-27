import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReactElement, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ClotheItem } from '../../../../api/getClothes';
import { ZIndex } from '../../../../styleConstants';
import { SpinningFontAwesomeIcon } from '../../../categoryName/categoryName.styles';
import { WebsiteName } from '../ClotheCard.styles';
import {
  CloseIcon,
  Container,
  Description,
  ImageContainer,
  ImagesContainer,
  LoadingContainer,
  Name,
  Price,
  StyledFavouriteHeart,
  TextContainer,
  ThumbnailContainer,
  ThumbnailImage,
  ViewButton,
  WebsitesLogo,
} from './ClothePreview.styles';
import { useClotheInfo } from './useClotheInfo';

interface Props {
  clothe: ClotheItem;
  isShowing: boolean;
  onRequestClose: VoidFunction;
  onFavouriteClick: (clothe: ClotheItem) => void;
  isFavourited: boolean;
}

export const ClothePreview = ({
  clothe,
  isShowing,
  onRequestClose,
  onFavouriteClick,
  isFavourited,
}: Props): ReactElement => {
  const clotheInfo = useClotheInfo(clothe.link, isShowing);
  const [selectedImage, setSelectedImage] = useState<string>();

  useEffect(() => clotheInfo && setSelectedImage(clotheInfo.images[0]), [
    clotheInfo,
  ]);

  const onViewProductClick = () => window?.open(clothe.link, '_blank')?.focus();

  return (
    <Modal
      style={{
        overlay: {
          zIndex: ZIndex.modal,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          zIndex: ZIndex.modal,
          color: 'black',
        },
      }}
      isOpen={isShowing}
      onRequestClose={onRequestClose}
      contentLabel='Example Modal'
    >
      <CloseIcon icon={faTimes} onClick={() => onRequestClose()} />
      {!clotheInfo && (
        <LoadingContainer>
          {'Fetching clothe info'}&nbsp;&nbsp;
          <SpinningFontAwesomeIcon icon={faSpinner} />
        </LoadingContainer>
      )}
      {clotheInfo && (
        <Container>
          <ImagesContainer>
            <ThumbnailContainer>
              {clotheInfo.images.map((img) => (
                <ThumbnailImage
                  key={img}
                  src={img}
                  alt=''
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </ThumbnailContainer>
            <ImageContainer imageSrc={selectedImage} />
          </ImagesContainer>
          <TextContainer>
            <WebsitesLogo src={clotheInfo.websitesLogo} />
            <WebsiteName>{clothe.website}</WebsiteName>
            <Name>{clothe.name}</Name>
            <Price>${clothe.price}</Price>
            <Description
              dangerouslySetInnerHTML={{
                __html: clotheInfo?.description || '',
              }}
            />
            <ViewButton onClick={() => onViewProductClick()}>
              View product
            </ViewButton>
            <StyledFavouriteHeart
              clothe={clothe}
              onFavouriteClick={onFavouriteClick}
              isFavourited={isFavourited}
            />
          </TextContainer>
        </Container>
      )}
    </Modal>
  );
};
