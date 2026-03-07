<<<<<<< HEAD
<<<<<<< HEAD
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
=======
=======
>>>>>>> main
"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";
import { cn } from "../../lib/utils";
<<<<<<< HEAD
>>>>>>> 2088e20 (Initial commit)
=======
>>>>>>> main

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
<<<<<<< HEAD
<<<<<<< HEAD
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName
=======
=======
>>>>>>> main
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
<<<<<<< HEAD
>>>>>>> 2088e20 (Initial commit)
=======
>>>>>>> main

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
<<<<<<< HEAD
<<<<<<< HEAD
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName
=======
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
>>>>>>> 2088e20 (Initial commit)
=======
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
>>>>>>> main

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
<<<<<<< HEAD
<<<<<<< HEAD
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
=======
=======
>>>>>>> main
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
<<<<<<< HEAD
>>>>>>> 2088e20 (Initial commit)
=======
>>>>>>> main
