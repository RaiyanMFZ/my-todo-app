import Image from "next/image";
import { useUser } from "@stackframe/stack";

export default function Home() {
  useUser({ or: "redirect" });
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
