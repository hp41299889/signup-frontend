import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignupForm from "./page/SignupForm";
import Base from "./layout/Base";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Base />}>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
