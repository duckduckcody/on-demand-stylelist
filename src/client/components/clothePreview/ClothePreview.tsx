import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Modal from 'react-modal';
import { ClothePreviewContext } from '../../contexts/ClothePreviewContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useWebsiteDescriptionFormatter } from '../../hooks/useWebsiteDescriptionFormatter';
import { ZIndex } from '../../styleConstants';
import {
  ButtonContainer,
  CloseIcon,
  Container,
  Description,
  ImageContainer,
  LoadingContainer,
  Name,
  Price,
  RelatedProduct,
  RelatedProductImage,
  RelatedProductsContainer,
  RelatedProductsSection,
  RelatedProductsTitle,
  TextContainer,
  ThumbnailContainer,
  ThumbnailImage,
  ViewButton,
  WebsiteName,
  WebsitesLogo,
} from './ClothePreview.styles';
import { useClotheInfo } from './useClotheInfo';

export const ClothePreview = (): ReactElement => {
  const { clothePreviewUrl, setClothePreviewUrl, optionalClotheInfo } =
    useContext(ClothePreviewContext);
  const isShowing = Boolean(clothePreviewUrl);

  const { clotheInfo, isLoading, isError } = useClotheInfo(clothePreviewUrl);

  const [selectedImage, setSelectedImage] = useState<string>();
  const isMobile = useIsMobile();

  const formattedDescription = useWebsiteDescriptionFormatter(
    clotheInfo?.description,
    clotheInfo?.websiteId
  );

  const relatedProductImageClick = (link: string) => setClothePreviewUrl(link);

  const onViewProductClick = useCallback(
    () => window?.open(clothePreviewUrl, '_blank')?.focus(),
    [clothePreviewUrl]
  );

  useEffect(() => Modal.setAppElement('#appElement'), []);

  useEffect(() => {
    if (isError && !isLoading) {
      setClothePreviewUrl(undefined);
      onViewProductClick();
    }
  }, [isError, isLoading, onViewProductClick, setClothePreviewUrl]);

  useEffect(() => {
    isShowing && clotheInfo && setSelectedImage(clotheInfo?.images[0]?.image);
  }, [isShowing, clotheInfo]);

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
          onRequestClose={() => setClothePreviewUrl(undefined)}
        >
          <CloseIcon onClick={() => setClothePreviewUrl(undefined)} />
          {isError && <p>BIG OLD ERROR</p>}
          {isLoading && (
            <LoadingContainer>
              <img src='/loading-spinner.gif' />
              <span>Fetching clothe info</span>
            </LoadingContainer>
          )}
          {!isLoading && !isError && clotheInfo && (
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
                <WebsiteName>{clotheInfo.websiteName}</WebsiteName>
                <Name>{clotheInfo.name}</Name>
                <Price>
                  {clotheInfo.soldOut
                    ? `Sold Out`
                    : `${
                        clotheInfo.price
                          ? `$${clotheInfo.price}`
                          : optionalClotheInfo?.price
                          ? `$${optionalClotheInfo?.price}`
                          : ``
                      }`}
                </Price>
                <Description
                  dangerouslySetInnerHTML={{
                    __html: formattedDescription,
                  }}
                />
                <ButtonContainer>
                  <ViewButton onClick={() => onViewProductClick()}>
                    View product
                  </ViewButton>
                </ButtonContainer>
              </TextContainer>
              {clotheInfo.relatedProducts && (
                <RelatedProductsSection>
                  <RelatedProductsTitle>
                    You might also like
                  </RelatedProductsTitle>
                  <RelatedProductsContainer>
                    {clotheInfo.relatedProducts.map((related) => (
                      <RelatedProduct key={related.link}>
                        <RelatedProductImage
                          src={related.image}
                          onClick={() => relatedProductImageClick(related.link)}
                        />
                        <span>{related.name}</span>
                      </RelatedProduct>
                    ))}
                  </RelatedProductsContainer>
                </RelatedProductsSection>
              )}
            </Container>
          )}
        </Modal>
      )}
    </>
  );
};
