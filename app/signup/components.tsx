import {
  WrapperComponent,
  type WrapperComponentProps,
} from "@webstudio-is/sdk";
import { useEffect, useState } from "react";
import { useTransition, Form } from "remix";

type SignupState = "initial" | "pending" | "complete";

const useSignupState = (): SignupState => {
  const transition = useTransition();
  const [state, setState] = useState<SignupState>("initial");
  useEffect(() => {
    if (transition.state === "submitting") {
      setState("pending");
    }
    if (transition.state === "idle" && state === "pending") {
      setState("complete");
    }
  }, [transition.state]);
  return state;
};

export const SignupForm = ({ children }: WrapperComponentProps) => {
  const signupState = useSignupState();
  if (signupState === "complete") {
    return null;
  }
  return (
    <Form method="post">
      <fieldset
        disabled={signupState === "pending"}
        style={{ border: 0, margin: 0, padding: 0 }}
      >
        {children}
      </fieldset>
    </Form>
  );
};

export const SignupSuccess = (props: WrapperComponentProps) => {
  const signupState = useSignupState();
  return signupState === "complete" ? <WrapperComponent {...props} /> : null;
};
