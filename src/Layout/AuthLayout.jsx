import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <>
      <h1>Marcador</h1>

      <Outlet />
    </>
  )
}