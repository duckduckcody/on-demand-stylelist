import { ReactElement } from 'react';
import { RelatedProducts as RelatedProductsType } from '../../../../types/ClotheInfo';
import {
  RelatedProduct,
  RelatedProductImage,
  RelatedProductsContainer,
  RelatedProductsSection,
  RelatedProductsTitle,
} from './RelatedProducts.styles';

interface Props {
  relatedProducts: RelatedProductsType[];
  onRelatedProductImageClick: (link: string) => void;
  className?: string;
}

export const RelatedProducts = ({
  relatedProducts,
  onRelatedProductImageClick,
  className,
}: Props): ReactElement => {
  return (
    <RelatedProductsSection className={className}>
      <RelatedProductsTitle>You might also like</RelatedProductsTitle>
      <RelatedProductsContainer>
        {relatedProducts.map((related) => (
          <RelatedProduct key={related.link}>
            <RelatedProductImage
              src={related.image}
              onClick={() => onRelatedProductImageClick(related.link)}
            />
            <span>{related.name}</span>
          </RelatedProduct>
        ))}
      </RelatedProductsContainer>
    </RelatedProductsSection>
  );
};
