import Hero from '@/components/hero';
import scaleImg from '/public/scale.jpg';

export default function ReliabilityPage() {
  return (
    <Hero
      imgData={scaleImg}
      imgAlt="steel factory"
      title="Scale Your app to infinity"
    />
  );
}
