import {
  WrapperComponent,
  type WrapperComponentProps,
} from "@webstudio-is/react-sdk";
import { useEffect, useState } from "react";
import { useTransition, Form } from "remix";

type SignupState = "initial" | "pending" | "complete";

/**
 * Abstract away the form submission state.
 * UI needs to map "submitting" and "idle" to SignupState.
 */
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

/**
 * This component is used to override SignupForm component from webstudio.
 * It renders Remix's Form component instead which takes care of data submission.
 */
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

/**
 * Success message shown to the user after subscribing.
 */
export const SignupSuccess = (props: WrapperComponentProps) => {
  const signupState = useSignupState();
  return signupState === "complete" ? <WrapperComponent {...props} /> : null;
};
