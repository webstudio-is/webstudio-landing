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
  // Importing JSON data from Webstudio generated by the CLI.
  return await import(".webstudio");
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  if (typeof email !== "string") return { errors: "Bad Email" };
  await subscribe({ email });
  return { status: "ok" };
};

/**
 * This is a Component Root component is going to use to render each tree node.
 * You can overide anything that comes from Webstudio or render a default wrapper.
 */
const Component = (props: WrapperComponentProps) => {
  // useUserProps gives access to user defined props
  const { override } = useUserProps(props.instance.id);

  // We want to override a component that has override="SignupForm" prop defined.
  if (override === "SignupForm") {
    return <SignupForm {...props} />;
  }

  // We want to override a component that has override="SignupSuccess" prop defined.
  if (override === "SignupSuccess") {
    return <SignupSuccess {...props} />;
  }

  // No override needed, we render the default Webstudio Wrapper
  return <WrapperComponent {...props} />;
};

export default function Index() {
  const data = useLoaderData();
  // @webstudio renders an application root with the data from the loader
  // and provides a Component that will wrap each React host component.
  // Inside that wrapper you can either override any component or render
  // the wrapper component provided by Webstudio.
  return <Root data={data} Component={Component} />;
}
