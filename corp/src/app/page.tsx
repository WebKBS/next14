import Hero from '@/components/hero';
import homeImage from '/public/home.jpg';

export default function Home() {
  return (
    <div className="">
      <Hero
        imgData={homeImage}
        imgAlt="Home"
        title="Professional Cloud Hosting"
      />
    </div>
  );
}
