import { useEffect, useState } from 'react';
import { clientWebsites } from '../clientWebsites';

export const useWebsiteDescriptionFormatter = (
  description = '',
  websiteName: string
): string => {
  const [formattedDescription, setFormattedDescription] = useState<string>('');

  useEffect(() => {
    if (!description) {
      setFormattedDescription('');
    } else {
      const website = clientWebsites.find(
        (website) => website.name === websiteName
      );
      if (!website || !website.descriptionFormatter) {
        setFormattedDescription(description);
      } else {
        setFormattedDescription(website.descriptionFormatter(description));
      }
    }
  }, [description, websiteName]);

  return formattedDescription;
};
