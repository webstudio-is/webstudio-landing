import {
  Root,
  useUserProps,
  WrapperComponent,
  type WrapperComponentProps,
} from "@webstudio-is/sdk";
import {
  useLoaderData,
  type ActionFunction,
  type MetaFunction,
  type LoaderFunction,
} from "remix";
import { subscribe } from "~/signup/subscribe";
import { SignupForm, SignupSuccess } from "~/signup/components";

export const meta: MetaFunction = () => {
  return {
    title:
      "Webstudio is an Open Source Visual Development Platform for Developers, Designers and cross-functional teams.",
    description:
      "Webstudio is an open NoCode tool with no vendor lock-in. It lets you export components and integrate them with your custom codebase.",
  };
};

export const loader: LoaderFunction = async () => {
  return await import(".webstudio");
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  if (typeof email !== "string") return { errors: "Bad Email" };
  await subscribe({ email });
  return { status: "ok" };
};

const Component = (props: WrapperComponentProps) => {
  const { override } = useUserProps(props.id);

  if (override === "SignupForm") {
    return <SignupForm {...props} />;
  }

  if (override === "SignupSuccess") {
    return <SignupSuccess {...props} />;
  }

  return <WrapperComponent {...props} />;
};

export default function Index() {
  const data = useLoaderData();
  return <Root data={data} Component={Component} />;
}
