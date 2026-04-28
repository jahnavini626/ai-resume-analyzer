interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeStyles = '';
  let label = '';

  if (score > 70) {
    badgeStyles = 'bg-badge-green text-badge-green-text';
    label = 'Strong';
  } else if (score > 49) {
    badgeStyles = 'bg-badge-yellow text-badge-yellow-text';
    label = 'Good Start';
  } else {
    badgeStyles = 'bg-badge-red text-badge-red-text';
    label = 'Needs Work';
  }

  return (
    <div className={`score-badge ${badgeStyles}`}>
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
};

export default ScoreBadge;
