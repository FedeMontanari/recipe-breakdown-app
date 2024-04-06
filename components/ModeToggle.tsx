"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";

export default function ModeToggle({
  buttonVariant,
  className,
  ...props
}: {
  buttonVariant: VariantProps<typeof buttonVariants>;
  className: string;
}) {
  const { setTheme, theme } = useTheme();
  const { variant } = buttonVariant;
  return (
    <div className={className}>
      {theme === "light" ? (
        <Button variant={variant} size="icon" onClick={() => setTheme("dark")}>
          <Moon />
        </Button>
      ) : (
        <Button variant={variant} size="icon" onClick={() => setTheme("light")}>
          <Sun />
        </Button>
      )}
    </div>
  );
}
