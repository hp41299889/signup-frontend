import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignupForm from "./page/SignupForm";
import Base from "./layout/Base";
import EmailVerify from "./page/EmailVerify";
import Home from "./page/Home";
import Service from "./page/Service";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Base />}>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/verify/:id" element={<EmailVerify />} />
          <Route path="/service" element={<Service />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
