import clsx from "clsx";
import c from "./PageWrapper.module.scss";

type PageWrapperProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const PageWrapper = ({ children, className, ...rest }: PageWrapperProps) => {
  return (
    <div className={clsx(c.pageWrapper, className)} {...rest}>
      {children}
    </div>
  );
};

export default PageWrapper;
