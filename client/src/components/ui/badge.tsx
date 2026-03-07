<<<<<<< HEAD
<<<<<<< HEAD
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
=======
=======
>>>>>>> main
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
<<<<<<< HEAD
>>>>>>> 2088e20 (Initial commit)
=======
>>>>>>> main
  {
    variants: {
      variant: {
        default:
<<<<<<< HEAD
<<<<<<< HEAD
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
=======
=======
>>>>>>> main
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
<<<<<<< HEAD
>>>>>>> 2088e20 (Initial commit)
=======
>>>>>>> main
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
<<<<<<< HEAD
<<<<<<< HEAD
  }
)
=======
  },
);
>>>>>>> 2088e20 (Initial commit)
=======
  },
);
>>>>>>> main

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
<<<<<<< HEAD
<<<<<<< HEAD
  )
}

export { Badge, badgeVariants }
=======
=======
>>>>>>> main
  );
}

export { Badge, badgeVariants };
<<<<<<< HEAD
>>>>>>> 2088e20 (Initial commit)
=======
>>>>>>> main
