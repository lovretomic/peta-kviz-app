import c from "./MemberNumberIndicator.module.scss";

type MemberNumberIndicatorProps = {
  numberOfIndicators?: number;
  filledIndicators?: number;
  necessaryIndicators?: number;
};

const MemberNumberIndicator: React.FC<MemberNumberIndicatorProps> = ({
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

export default MemberNumberIndicator;
