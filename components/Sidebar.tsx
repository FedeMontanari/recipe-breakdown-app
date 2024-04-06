"use client";

import Link from "next/link";
import { Beef, CookingPot, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import ModeToggle from "./ModeToggle";

const mainElements = [
  {
    name: "Inicio",
    href: "/",
    icon: <Home className="mr-1 inline" size={20} />,
  },
  {
    name: "Productos",
    href: "/products",
    icon: <Beef className="mr-1 inline" size={20} />,
  },
  {
    name: "Recetas",
    href: "/recipes",
    icon: <CookingPot className="mr-1 inline" size={20} />,
  },
];

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <aside className="absolute left-0 h-full w-56 bg-secondary py-5 pl-4">
        <nav>
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-evenly">
              <h3 className="text-start text-sm font-semibold text-muted-foreground">
                Navegación
              </h3>
              <ModeToggle className="ml-auto pr-3" />
            </div>
            {mainElements.map((v, i) => (
              <Button
                variant="link"
                className="self-start transition-all hover:scale-105"
                key={i}
                asChild
              >
                <Link href={v.href}>
                  {v.icon}
                  {v.name}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      </aside>
    );
  }

  return (
    <Drawer direction="left">
      <DrawerTrigger className="absolute left-5 top-5 rounded-md border p-2">
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <nav className="w-56 py-5 pl-5">
          <div className="flex flex-col">
            <h3 className="text-start text-sm font-semibold text-muted-foreground">
              Navegación
            </h3>
            {mainElements.map((v, i) => (
              <Button
                variant="link"
                className="self-start transition-all hover:scale-105"
                key={i}
                asChild
              >
                <Link href={v.href}>
                  {v.icon}
                  {v.name}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
