"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const PageHeader = () => {
  return (
    <div className="flex shrink items-center justify-between gap-2 rounded-lg">
      <div className="text-2xl font-semibold tracking-tight">🐶 Woof Radar</div>
      <div className="flex gap-2">
        <SignedIn>
          <Button size={"sm"}>My woofs</Button>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button size={"sm"}>Sign in</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};
