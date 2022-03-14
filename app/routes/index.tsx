import {
  Root,
  loader,
  useUserProps,
  WrapperComponent,
  type WrapperComponentProps,
} from "@webstudio-is/sdk";
import { useLoaderData, useTransition, Form, type ActionFunction } from "remix";
import { subscribe } from "~/signup/subscribe";
import { SignupForm, SignupSuccess } from "~/signup/components";

export { loader };

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
