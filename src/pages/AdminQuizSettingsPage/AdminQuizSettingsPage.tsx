import AdminButton from "../../components/AdminButton";
import c from "./AdminQuizSettingsPage.module.scss";

const AdminQuizSettingsPage = () => {
  return (
    <div className={c.page}>
      <h1>Postavke</h1>
      <p className={c.description}>Ovdje možete prilagoditi postavke kviza.</p>
      <div className={c.inputContainer}>
        <label htmlFor="title">Naslov</label>
        <input type="text" id="title" />
      </div>
      <div className={c.inputContainer}>
        <label htmlFor="id">Oznaka</label>
        <input type="text" id="id" disabled />
      </div>
      <div className={c.inputContainer}>
        <label htmlFor="status">Status</label>
        <select name="status" id="status">
          <option value="upcoming">Nadolazeći</option>
          <option value="ongoing">U tijeku</option>
          <option value="completed">Završen</option>
        </select>
      </div>
      <div className={c.inputContainer}>
        <label htmlFor="league">Liga</label>
        <select name="league" id="league">
          <option value="league1">Liga 1</option>
          <option value="league2">Liga 2</option>
          <option value="league3">Liga 3</option>
        </select>
      </div>
      <div className={c.inputContainer}>
        <label htmlFor="date">Datum i vrijeme</label>
        <input type="datetime-local" id="date" />
      </div>
      <div className={c.inputContainer}>
        <label htmlFor="location">Lokacija</label>
        <input type="text" id="location" />
      </div>
      <div className={c.inputContainer}>
        <label htmlFor="capacity">Broj mjesta</label>
        <input type="number" id="capacity" />
      </div>
      <AdminButton variant="secondary">Povratak</AdminButton>
      <AdminButton>Spremi promjene</AdminButton>
    </div>
  );
};

export default AdminQuizSettingsPage;
