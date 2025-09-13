import PageWrapper from "../../components/PageWrapper";
import ProgressBar from "../../components/ProgressBar";
import c from "./QuizzesPage.module.scss";

const QuizzesPage = () => {
  return (
    <>
      <div className={c.actionsHeader}>
        <PageWrapper className={c.wrapper}>
          <select name="" id="">
            <option value="">Liga 2024.</option>
            <option value="">Liga 2025.</option>
          </select>
          <button>Sortiraj</button>
        </PageWrapper>
      </div>
      <PageWrapper className={c.pageWrapper}>
        <ProgressBar
          label="Loading..."
          percentage={45}
          date={new Date()}
          variant="withButtons"
        />
      </PageWrapper>
    </>
  );
};

export default QuizzesPage;
