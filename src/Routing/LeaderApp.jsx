import { Routes, Route, Navigate } from "react-router-dom";
import Overview from "../Leader/OverView";
import LeaderLayout from "../Layout/LeaderLayout";
import Lead from "../Leader/lead/lead";

const LeaderApp = ({ setRole }) => {
  return (
    <Routes>
      <Route path="/leader" element={<LeaderLayout setRole={setRole} />}>
        <Route path="overview" element={<Overview />} />
        <Route path="lead" element={<Lead />} />
        <Route path="*" element={<Navigate to="/leader/overview" replace />} />
      </Route>
    </Routes>
  );
};

export default LeaderApp;
