"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant={"ghost"}
      size={"icon"}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
