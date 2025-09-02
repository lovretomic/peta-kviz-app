import c from "./FullIndicator.module.scss";

type FullIndicatorProps = {
  numberOfIndicators?: number;
  filledIndicators?: number;
  necessaryIndicators?: number;
};

const FullIndicator: React.FC<FullIndicatorProps> = ({
  numberOfIndicators = 5,
  filledIndicators = 0,
  necessaryIndicators = 3,
}) => {
  return (
    <div className={c.indicatorGroup}>
      {Array.from({ length: numberOfIndicators }).map((_, i) => (
        <div
          key={i}
          className={
            i < filledIndicators
              ? c.filled
              : i < necessaryIndicators
              ? c.necessary
              : c.empty
          }
        />
      ))}
    </div>
  );
};

export default FullIndicator;
