import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Judge } from "./Judge";
import { Referee } from "./Referee";
import { AuthLayout } from "../Layout/AuthLayout";
import "../assets/App/App.css";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Judge />} />
            <Route path="referee" element={<Referee />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
