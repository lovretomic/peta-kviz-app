import c from "./ProgressBar.module.scss";
import clsx from "clsx";

type ProgressBarProps = {
  percentage: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  className,
  ...handlers
}) => {
  return (
    <div className={c.progressBarContainer}>
      <div className={clsx(c.progressBar, className)} {...handlers}>
        <div
          className={clsx(c.progress, className)}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
export default ProgressBar;
