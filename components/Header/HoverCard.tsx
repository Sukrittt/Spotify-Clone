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
        className="relative right-10 top-2 w-[200px] rounded-md bg-neutral-700 p-3 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
        sideOffset={5}
      >
        <p className="text-sm">For display purposes only.</p>
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default HoverUserCard;
