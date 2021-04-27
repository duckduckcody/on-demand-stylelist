import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ReactElement, useState } from 'react';
import Modal from 'react-modal';
import { ClotheItem } from '../../../../api/getClothes';
import { ZIndex } from '../../../../styleConstants';
import { SpinningFontAwesomeIcon } from '../../../categoryName/categoryName.styles';
import {
  ClotheInfoContainer,
  ClotheInfoImage,
  ClotheInfoImageContainer,
  ClotheInfoTextContainer,
  ClotheInfoThumbnailContainer,
  ClotheInfoThumbnailImage,
  LoadingContainer,
  ViewButton,
  WebsitesLogo,
} from './ClothePreview.styles';
import { useClotheInfo } from './useClotheInfo';

interface Props {
  clothe: ClotheItem;
  isShowing: boolean;
  onRequestClose: VoidFunction;
}

export const ClothePreview = ({
  clothe,
  isShowing,
  onRequestClose,
}: Props): ReactElement => {
  const clotheInfo = useClotheInfo(clothe.link, isShowing);
  const [selectedImage, setSelectedImage] = useState(
    clotheInfo?.images[0] || undefined
  );

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
      {!clotheInfo && (
        <LoadingContainer>
          {'Fetching clothe info'}&nbsp;&nbsp;
          <SpinningFontAwesomeIcon icon={faSpinner} />
        </LoadingContainer>
      )}
      {clotheInfo && (
        <ClotheInfoContainer>
          <ClotheInfoImageContainer>
            <ClotheInfoThumbnailContainer>
              {clotheInfo.images.map((img) => (
                <ClotheInfoThumbnailImage key={img} src={img} alt='' />
              ))}
            </ClotheInfoThumbnailContainer>
            <ClotheInfoImage src={clotheInfo.images[0]} />
          </ClotheInfoImageContainer>
          <ClotheInfoTextContainer>
            <WebsitesLogo src={clotheInfo.websitesLogo} />
            <br />${clothe.price}
            <br />
            {clothe.name}
            <div
              dangerouslySetInnerHTML={{ __html: clotheInfo?.description }}
            />
            <ViewButton>View product</ViewButton>
          </ClotheInfoTextContainer>
        </ClotheInfoContainer>
      )}
    </Modal>
  );
};
