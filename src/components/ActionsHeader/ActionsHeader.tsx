import PageWrapper from "../PageWrapper";
import c from "./ActionsHeader.module.scss";

type ActionsHeaderProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const ActionsHeader = ({ children, ...props }: ActionsHeaderProps) => {
  return (
    <div className={c.actionsHeader} {...props}>
      <PageWrapper className={c.wrapper}>{children}</PageWrapper>
    </div>
  );
};

export default ActionsHeader;
