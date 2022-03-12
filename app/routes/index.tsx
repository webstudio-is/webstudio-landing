// @ts-expect-error @todo
import { Root, loader } from "@webstudio-is/sdk";
import { useLoaderData } from "remix";

export { loader };

export default function Index() {
  const data = useLoaderData();
  return <Root data={data} />;
}
