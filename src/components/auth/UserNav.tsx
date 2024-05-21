"use client";
import Link from "next/link";
import { Button } from "../ui/button";

export const UserNav = () => {
  return (
    <div className="flex gap-2">
      <Link href={"/new"}>
        <Button>New</Button>
      </Link>
    </div>
  );
};
