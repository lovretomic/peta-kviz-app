import AdminButton from "../../components/AdminButton";
import AdminInput from "../../components/AdminInput";
import AdminSelect from "../../components/AdminSelect";
import c from "./AdminQuizSettingsPage.module.scss";

const AdminQuizSettingsPage = () => {
  return (
    <div className={c.page}>
      <h1>Postavke</h1>
      <p className={c.description}>Ovdje možete prilagoditi postavke kviza.</p>
      <div className={c.grid}>
        <div>
          <div className={c.inputContainer}>
            <label htmlFor="title">Naslov</label>
            <AdminInput type="text" id="title" />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="id">Oznaka</label>
            <AdminInput type="text" id="id" disabled />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="status">Status</label>
            <AdminSelect name="status" id="status">
              <option value="upcoming">Nadolazeći</option>
              <option value="ongoing">U tijeku</option>
              <option value="completed">Završen</option>
            </AdminSelect>
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="league">Liga</label>
            <AdminSelect name="league" id="league">
              <option value="league1">Liga 1</option>
              <option value="league2">Liga 2</option>
              <option value="league3">Liga 3</option>
            </AdminSelect>
          </div>
        </div>
        <div>
          <div className={c.inputContainer}>
            <label htmlFor="date">Datum i vrijeme</label>
            <AdminInput type="datetime-local" id="date" />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="location">Lokacija</label>
            <AdminInput type="text" id="location" />
          </div>
          <div className={c.inputContainer}>
            <label htmlFor="capacity">Broj mjesta</label>
            <AdminInput type="number" id="capacity" />
          </div>
        </div>
      </div>

      <div className={c.buttons}>
        <AdminButton variant="secondary">Povratak</AdminButton>
        <AdminButton>Spremi promjene</AdminButton>
      </div>
    </div>
  );
};

export default AdminQuizSettingsPage;
