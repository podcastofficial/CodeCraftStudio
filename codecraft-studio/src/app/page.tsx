import { redirect } from "next/navigation";

// The public entry point is the Telegram-first Mini App experience.
export default function HomePage() {
  redirect("/miniapp");
}
