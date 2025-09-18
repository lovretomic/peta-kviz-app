import c from "./ProgressBar.module.scss";
import clsx from "clsx";
import carIcon from "../../assets/icons/full-cars.svg";
import Button, { type ButtonVariant } from "../Button/Button";
import { formatDate } from "../../dateHelpers";

type ProgressBarProps = {
  percentage: number;
  label: string;
  date: Date | string;
  className?: string;
  buttonLabel?: string;
  buttonVariant?: ButtonVariant;
  onButtonClick?: () => void;
  showMessage?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  date,
  className,
  buttonLabel,
  onButtonClick,
  buttonVariant = "primary",
  showMessage = false,
  ...handlers
}) => {
  return (
    <div className={c.progressBarContainer}>
      <div className={c.info}>
        <span>{label}</span>
        <span className={c.date}>{formatDate(date)}</span>
      </div>

      <div className={clsx(c.progressBar, className)} {...handlers}>
        <div
          className={clsx(c.progress, className)}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className={c.percentage}>
        {percentage < 100
          ? `Popunjeno ${percentage} % mjesta`
          : "Sva su mjesta popunjena!"}
      </div>

      {percentage === 100 && showMessage && (
        <div className={c.fullPopup}>
          <img src={carIcon} alt="Kviz popunjen do kraja" />
          Vašu ćemo prijavu prihvatiti ako se oslobodi mjesto. Pratite
          obavijesti putem e-pošte i Instagrama.
        </div>
      )}

      {buttonLabel && percentage !== 100 && (
        <Button variant={buttonVariant} onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </div>
  );
};
export default ProgressBar;
