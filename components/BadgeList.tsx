import Badge from "./Badge";

interface BadgeListProps {
  texts: string[];
}

function BadgeList({ texts }: BadgeListProps) {
  return (
    <div>
      {texts.map((t: string, idx: number) => (
        <Badge className="mr-4" key={idx} label={t} type="keyword" />
      ))}
    </div>
  );
}

export default BadgeList;
