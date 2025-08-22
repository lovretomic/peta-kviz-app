import c from "./ProgressBar.module.scss";
import clsx from "clsx";
import carIcon from "../../assets/icons/full-cars.svg";
import Button from "../Button/Button";

type ProgressBarProps = {
  percentage: number;
  label: string;
  date: Date | string;
  className?: string;
  variant?: "default" | "withButtons";
  showMessage?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  date,
  className,
  variant = "default",
  showMessage = true,
  ...handlers
}) => {
  return (
    <div className={c.progressBarContainer}>
      <div className={c.info}>
        <span>{label}</span>
        <span className={c.date}>
          {typeof date === "string"
            ? Date.parse(date)
              ? date
              : "Neispravan datum"
            : date.toLocaleDateString("hr-HR", {
                weekday: "long",
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
        </span>
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
          Vašu ćemo prijavu prihvatiti ako se oslobodi mjesto. Prati obavijesti
          putem e-pošte i Instagrama.
        </div>
      )}

      {variant === "withButtons" && percentage !== 100 && (
        <div style={{ display: "flex", gap: "16px" }}>
          <Button variant="secondary">Prijavi se</Button>
          <Button variant="primary">Odustani</Button>
        </div>
      )}
    </div>
  );
};
export default ProgressBar;
