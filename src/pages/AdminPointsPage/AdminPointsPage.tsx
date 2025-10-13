import AdminPointsTable from "../../components/AdminPointsTable";
import c from "./AdminPointsPage.module.scss";

const AdminPointsPage = () => {
  return (
    <div className={c.page}>
      <h1 className={c.title}>Kviz općeg znanja — bodovi</h1>
      <p className={c.subtitle}>1. 1. 2025. u 19:00 sati.</p>
      <AdminPointsTable />
    </div>
  );
};

export default AdminPointsPage;
