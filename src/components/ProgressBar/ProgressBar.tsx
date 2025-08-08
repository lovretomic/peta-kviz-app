import c from "./ProgressBar.module.scss";
import clsx from "clsx";

type ProgressBarProps = {
  value: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className,
  ...handlers
}) => {
  return (
    <div className={clsx(c.progress, className)} {...handlers}>
      <div
        className={clsx(c.bar, className)}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
export default ProgressBar;
