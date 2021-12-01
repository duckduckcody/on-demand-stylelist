import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "react-modal";
import { ClothePreviewContext } from "../../contexts/ClothePreviewContext";
import { useFavourites } from "../../hooks/useFavourites";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useWebsiteDescriptionFormatter } from "../../hooks/useWebsiteDescriptionFormatter";
import { ZIndex } from "../../styles";
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
  StyledRelatedProducts,
  TextContainer,
  ThumbnailContainer,
  ThumbnailImage,
  ViewButton,
  WebsiteName,
  WebsitesLogo,
} from "./ClothePreview.styles";
import { useClotheInfo } from "./useClotheInfo";

export const ClothePreview = (): ReactElement => {
  const { clothePreviewUrl, setClothePreviewUrl, optionalClotheInfo } =
    useContext(ClothePreviewContext);
  const isShowing = Boolean(clothePreviewUrl);

  const { clotheInfo, isLoading, isError } = useClotheInfo(clothePreviewUrl);
  const { favourites, setFavourite } = useFavourites();

  const [selectedImage, setSelectedImage] = useState<string>();
  const isMobile = useIsMobile();

  const formattedDescription = useWebsiteDescriptionFormatter(
    clotheInfo?.description,
    clotheInfo?.websiteId
  );

  const hasRelatedProducts =
    clotheInfo?.relatedProducts && clotheInfo.relatedProducts.length > 0;

  const onRelatedProductImageClick = (link: string) => {
    setSelectedImage(undefined);
    setClothePreviewUrl(link);
  };

  const onViewProductClick = useCallback(
    () => window?.open(clothePreviewUrl, "_blank")?.focus(),
    [clothePreviewUrl]
  );

  const isFavourited = useMemo(
    () =>
      clotheInfo &&
      favourites &&
      favourites.some((fav) => fav.link === clotheInfo.link),
    [clotheInfo, favourites]
  );

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
    if (isShowing) document.body.style.overflow = "hidden";
    if (!isShowing) document.body.style.overflow = "unset";
  }, [isShowing]);

  return (
    <>
      {isShowing && (
        <Modal
          style={{
            overlay: {
              zIndex: ZIndex.modal,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              zIndex: ZIndex.modal,
              color: "white",
              backgroundColor: "#181818",
              border: "none",
              padding: isMobile ? 0 : "20px",
              maxWidth: isMobile ? "100%" : "max-content",
              margin: "0 auto",
              inset: isMobile ? "0" : "40px",
            },
          }}
          isOpen={isShowing}
          onRequestClose={() => setClothePreviewUrl(undefined)}
        >
          {isLoading && (
            <LoadingContainer>
              <CloseIcon
                icon={faTimes}
                onClick={() => setClothePreviewUrl(undefined)}
              />
              <img src="/loading-spinner.gif" />
              <span>Fetching clothe info</span>
            </LoadingContainer>
          )}

          {!isLoading && !isError && clotheInfo && (
            <Container hasRelatedProducts={hasRelatedProducts}>
              <CloseIcon
                icon={faTimes}
                onClick={() => setClothePreviewUrl(undefined)}
              />

              <ThumbnailContainer>
                {clotheInfo.images.map((img) => (
                  <ThumbnailImage
                    isMobile={isMobile}
                    key={img.thumbnail}
                    src={img.thumbnail}
                    selected={!isMobile && selectedImage === img.image}
                    alt=""
                    onClick={() => setSelectedImage(img.image)}
                  />
                ))}
              </ThumbnailContainer>

              {!isMobile && <ImageContainer imageSrc={selectedImage} />}

              <TextContainer isMobile={isMobile}>
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

                <StyledFavouriteHeart
                  clothe={{
                    ...clotheInfo,
                    website: clotheInfo.websiteName,
                    image: clotheInfo.images[0].image || "",
                  }}
                  onFavouriteClick={setFavourite}
                  isFavourited={isFavourited}
                />

                <ButtonContainer>
                  <ViewButton onClick={() => onViewProductClick()}>
                    View product on {clotheInfo.websiteName}
                  </ViewButton>
                </ButtonContainer>
                {isMobile && clotheInfo.relatedProducts && (
                  <StyledRelatedProducts
                    relatedProducts={clotheInfo.relatedProducts}
                    onRelatedProductImageClick={onRelatedProductImageClick}
                  />
                )}
              </TextContainer>

              {!isMobile && clotheInfo.relatedProducts && (
                <StyledRelatedProducts
                  relatedProducts={clotheInfo.relatedProducts}
                  onRelatedProductImageClick={onRelatedProductImageClick}
                />
              )}
            </Container>
          )}
        </Modal>
      )}
    </>
  );
};
