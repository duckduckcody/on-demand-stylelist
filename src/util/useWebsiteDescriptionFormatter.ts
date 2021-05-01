import { useEffect, useState } from 'react';
import { frontEndWebsites } from '../frontEndWebsites';

export const useWebsiteDescriptionFormatter = (
  description = '',
  websiteName: string
): string => {
  const [formattedDescription, setFormattedDescription] = useState<string>('');

  useEffect(() => {
    if (!description) {
      setFormattedDescription('');
    } else {
      console.log('description', description);
      const website = frontEndWebsites.find(
        (website) => website.name === websiteName
      );
      console.log('here 1');
      console.log(frontEndWebsites);
      if (!website || !website.descriptionFormatter) {
        setFormattedDescription(description);
      } else {
        console.log('here 2');
        setFormattedDescription(website.descriptionFormatter(description));
      }
    }
  }, [description, websiteName]);

  return formattedDescription;
};