import * as HoverCard from "@radix-ui/react-hover-card";
import { FaUserAlt } from "react-icons/fa";

import Button from "@/ui/Button/Button";

const HoverUserCard = () => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <Button className="bg-white">
        <FaUserAlt />
      </Button>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content
        className="relative right-10 top-2 w-[200px] rounded-md bg-neutral-700 p-3"
        sideOffset={5}
      >
        <p className="text-sm">For display purposes only.</p>
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default HoverUserCard;
