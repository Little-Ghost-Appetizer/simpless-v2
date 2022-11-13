interface BadgeProps {
  label: string;
  className: string;
  type: "keyword" | "hashtag";
}

function Badge({ label, className, type }: BadgeProps) {
  return (
    <button className={`rounded-md bg-white hover:bg-gray-200 inline-block p-2 px-4 font-semibold ${className}`}>
      {type == "keyword" ? label : `#${label}`}
    </button>
  );
}

export default Badge;
