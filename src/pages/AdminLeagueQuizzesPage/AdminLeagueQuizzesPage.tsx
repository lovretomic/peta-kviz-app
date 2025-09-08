import { useParams } from "react-router-dom";

const AdminLeagueQuizzesPage = () => {
  const { leagueId } = useParams();
  return <div>AdminLeagueQuizzesPage - League ID: {leagueId}</div>;
};

export default AdminLeagueQuizzesPage;
