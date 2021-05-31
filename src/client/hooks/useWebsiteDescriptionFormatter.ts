import { useEffect, useState } from 'react';
import { clientWebsites } from '../clientWebsites';

export const useWebsiteDescriptionFormatter = (
  description = '',
  websiteId: number | undefined
): string => {
  const [formattedDescription, setFormattedDescription] = useState<string>('');

  useEffect(() => {
    if (!description || !websiteId) {
      setFormattedDescription('');
    } else {
      const website = clientWebsites.find(
        (website) => website.id === websiteId
      );
      if (!website || !website.descriptionFormatter) {
        setFormattedDescription(description);
      } else {
        setFormattedDescription(website.descriptionFormatter(description));
      }
    }
  }, [description, websiteId]);

  return formattedDescription;
};
