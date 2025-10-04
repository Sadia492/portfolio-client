import Hero from "@/components/modules/Home/Hero";
import Skills from "@/components/modules/Home/Skills";
import { Button } from "@/components/ui/button";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Home | My Portfolio",
};

export default function HomePage() {
  return (
    <div>
      <Hero></Hero>
      <Skills></Skills>
    </div>
  );
}
