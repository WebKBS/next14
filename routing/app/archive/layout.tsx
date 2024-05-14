interface ArchiveLayoutProps {
  archive: React.ReactNode;
  latest: React.ReactNode;
}

const ArchiveLayout = ({ archive, latest }: ArchiveLayoutProps) => {
  // Archive의 뜻은 기록 보관소로, 여기서는 기록을 보관하는 페이지를 의미합니다.
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </div>
  );
};

export default ArchiveLayout;
