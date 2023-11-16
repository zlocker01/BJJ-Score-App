import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScoreProvider } from "./ScoreContext";
import { Judge } from "./Judge";
import { Referee } from "./Referee";
import { AuthLayout } from "../Layout/AuthLayout";

export function App() {
  return (
    <>
      <BrowserRouter>
        <ScoreProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Judge />} />
              <Route path="referee" element={<Referee />} />
            </Route>
          </Routes>
        </ScoreProvider>
      </BrowserRouter>
    </>
  );
}
