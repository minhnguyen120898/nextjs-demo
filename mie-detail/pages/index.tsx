import { useRouter } from 'next/router';
import React, {useEffect} from 'react';

export interface HomePageProps {
}

export default function HomePage (props: HomePageProps) {
  const router = useRouter();

  useEffect(() => {
    router.push('/404')
  }, []);

  return (
    <div></div>
  );
}
