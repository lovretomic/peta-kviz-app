import c from "./ProgressBar.module.scss";
import clsx from "clsx";

type ProgressBarProps = {
  percentage: number;
  label: string;
  date: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  date,
  className,
  ...handlers
}) => {
  return (
    <div className={c.progressBarContainer}>
      <div className={c.info}>
        <span>{label}</span>
        <span className={c.date}>{date}</span>
      </div>
      <div className={clsx(c.progressBar, className)} {...handlers}>
        <div
          className={clsx(c.progress, className)}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className={c.percentage}>
        {percentage < 100
          ? `Popunjeno ${percentage} % mjesta`
          : "Sva su mjesta popunjena!"}
      </div>

      {percentage === 100 && (
        <div className={c.fullPopup}>Kviz je popunjen do kraja!</div>
      )}
    </div>
  );
};
export default ProgressBar;
