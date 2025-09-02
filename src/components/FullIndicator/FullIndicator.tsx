import c from "./FullIndicator.module.scss";

type FullIndicatorProps = {
  numberOfMembers: number;
};

const FullIndicator: React.FC<FullIndicatorProps> = ({ numberOfMembers }) => {
  if (numberOfMembers >= 5) {
    return <div className={c.fullIndicator}>Popis je pun</div>;
  }
  return (
    <div className={c.fullIndicator}>Još {5 - numberOfMembers} mjesta</div>
  );
};

export default FullIndicator;
