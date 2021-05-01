import { ReactElement, useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ClotheItem } from '../../../../api/getClothes';
import { ZIndex } from '../../../../styleConstants';
import { useIsMobile } from '../../../../util/useIsMobile';
import { useWebsiteDescriptionFormatter } from '../../../../util/useWebsiteDescriptionFormatter';
import {
  ButtonContainer,
  CloseIcon,
  Container,
  Description,
  ImageContainer,
  LoadingContainer,
  Name,
  Price,
  StyledFavouriteHeart,
  TextContainer,
  ThumbnailContainer,
  ThumbnailImage,
  ViewButton,
  WebsiteName,
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
  const { error, clotheInfo } = useClotheInfo(clothe.link, isShowing);
  const [selectedImage, setSelectedImage] = useState<string>();
  const isMobile = useIsMobile();

  const formattedDescription = useWebsiteDescriptionFormatter(
    clotheInfo?.description,
    clothe.website
  );

  const onViewProductClick = useCallback(
    () => window?.open(clothe.link, '_blank')?.focus(),
    [clothe.link]
  );

  useEffect(() => {
    if (isShowing && clotheInfo && !error)
      setSelectedImage(clotheInfo.images[0].image);
    if (isShowing && clotheInfo && error) {
      onViewProductClick();
      onRequestClose();
    }
  }, [isShowing, clotheInfo, error, onViewProductClick, onRequestClose]);

  useEffect(() => {
    if (isShowing) document.body.style.overflow = 'hidden';
    if (!isShowing) document.body.style.overflow = 'unset';
  }, [isShowing]);

  return (
    <>
      {isShowing && (
        <Modal
          style={{
            overlay: {
              zIndex: ZIndex.modal,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              zIndex: ZIndex.modal,
              color: 'white',
              backgroundColor: '#181818',
              border: 'none',
              padding: isMobile ? 0 : '20px',
            },
          }}
          isOpen={isShowing}
          onRequestClose={onRequestClose}
          contentLabel='Example Modal'
        >
          <CloseIcon onClick={() => onRequestClose()} />
          {!clotheInfo && (
            <LoadingContainer>
              <img src='/loading-spinner.gif' />
              <span>Fetching clothe info</span>
            </LoadingContainer>
          )}
          {clotheInfo && !error && (
            <Container>
              <ThumbnailContainer>
                {clotheInfo.images.map((img) => (
                  <ThumbnailImage
                    key={img.thumbnail}
                    src={img.thumbnail}
                    selected={selectedImage === img.image}
                    alt=''
                    onClick={() => setSelectedImage(img.image)}
                  />
                ))}
              </ThumbnailContainer>
              {!isMobile && <ImageContainer imageSrc={selectedImage} />}
              <TextContainer>
                <WebsitesLogo src={clotheInfo.websitesLogo} />
                <WebsiteName>{clothe.website}</WebsiteName>
                <Name>{clothe.name}</Name>
                <Price>${clothe.price}</Price>
                <Description
                  dangerouslySetInnerHTML={{
                    __html: formattedDescription,
                  }}
                />
                <ButtonContainer>
                  <ViewButton onClick={() => onViewProductClick()}>
                    View product
                  </ViewButton>
                  <StyledFavouriteHeart
                    clothe={clothe}
                    onFavouriteClick={onFavouriteClick}
                    isFavourited={isFavourited}
                  />
                </ButtonContainer>
              </TextContainer>
            </Container>
          )}
        </Modal>
      )}
    </>
  );
};
