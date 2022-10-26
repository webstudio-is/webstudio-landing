import { Root } from "@webstudio-is/react-sdk";
import {
  Outlet as DefaultOutlet,
  ScrollRestoration,
  LiveReload,
  Scripts,
} from "remix";

const Outlet = () => (
  <>
    <DefaultOutlet />
    <ScrollRestoration />
    {process.env.NODE_ENV === "development" && <LiveReload />}
  </>
);

/**
 * We are using Outlet prop from designer index layout when user renders site from a subdomain.
 */
export default function Document() {
  return <Root Outlet={Outlet} />;
}
