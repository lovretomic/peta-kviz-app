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
    <div className={clsx(c.progressBarContainer, className)} {...handlers}>
      <div
        className={clsx(c.progress, className)}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
export default ProgressBar;
