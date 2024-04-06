"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function ModeToggle({
  className,
  ...props
}: {
  className: string;
}) {
  const { setTheme, theme } = useTheme();
  return (
    <div className={className}>
      {theme === "light" ? (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setTheme("light")}
        >
          <Sun />
        </Button>
      )}
    </div>
  );
}
