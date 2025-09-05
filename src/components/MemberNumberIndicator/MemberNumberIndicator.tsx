import c from "./MemberNumberIndicator.module.scss";

type MemberNumberIndicatorProps = {
  max?: number;
  value?: number;
  min?: number;
};

const MemberNumberIndicator: React.FC<MemberNumberIndicatorProps> = ({
  max = 5,
  value = 0,
  min = 3,
}) => {
  return (
    <div className={c.indicatorGroup}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={i < value ? c.filled : i < min ? c.necessary : c.empty}
        />
      ))}
    </div>
  );
};

export default MemberNumberIndicator;
