import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { StaticSafeWebsite, staticSafeWebsites } from '../src/api/constants';

export const getStaticProps: GetStaticProps = async (context) => ({
  props: { websites: staticSafeWebsites },
});

interface Props {
  websites: StaticSafeWebsite[];
}

export default function Websites({ websites }: Props) {
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);

  useEffect(() => {
    if (process.browser) {
      const websites = JSON.parse(
        window.localStorage.getItem('websites') ?? '[]'
      );
      websites.length && setSelectedWebsites(websites);
    }
  }, []);

  useEffect(
    () =>
      window.localStorage.setItem('websites', JSON.stringify(selectedWebsites)),
    [selectedWebsites]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const cat = selectedWebsites.concat(event.target.value);
      setSelectedWebsites(cat);
    } else {
      const filtered = selectedWebsites.filter(
        (website) => website !== event.target.value
      );
      setSelectedWebsites(filtered);
    }
  };

  return (
    <>
      {websites.map((website) => (
        <div key={website.id}>
          <label>{website.name}</label>
          <input
            type='checkbox'
            value={website.id}
            checked={selectedWebsites.includes(`${website.id}`)}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </>
  );
}
