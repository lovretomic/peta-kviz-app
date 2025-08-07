import c from "./Progress.module.scss";
import clsx from "clsx";

type ProgressProps = {
  value: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const Progress: React.FC<ProgressProps> = ({
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
export default Progress;
