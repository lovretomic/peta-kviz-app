import clsx from "clsx";
import c from "./PageWrapper.module.scss";

type PageWrapperProps = {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

const PageWrapper = ({
  children,
  className,
  ref,
  ...rest
}: PageWrapperProps) => {
  return (
    <div className={clsx(c.pageWrapper, className)} {...rest} ref={ref}>
      {children}
    </div>
  );
};

export default PageWrapper;
