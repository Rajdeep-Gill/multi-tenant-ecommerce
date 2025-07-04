import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    return redirect("/");
  }

  return <SignUpView />;
};
export default SignUpPage;
