import HeroSection from './HeroSection';

const tiles = [
  {
    title: "Full‑Stack",
    subtitle: "End‑to‑end product builds",
    poster: "/images/poster-fullstack.jpg",
    video: "/videos/fullstack-loop.mp4",
    href: "/full-stack"
  },
  {
    title: "Computer Vision",
    subtitle: "ML pipelines for smart perception",
    poster: "/images/poster-cv.jpg",
    video: "/videos/cv-loop.mp4",
    href: "/computer-vision"
  },
  {
    title: "VR Training",
    subtitle: "Immersive learning environments",
    poster: "/images/poster-vr.jpg",
    video: "/videos/vr-loop.mp4",
    href: "/vr-training"
  }
];

function App() {
  return (
    <div className="App">
      < HeroSection tiles={tiles} />
    </div>
  );
}

export default App;
