import { FC } from "react";
import * as Switch from "@radix-ui/react-switch";

interface SwitchPrivacyProps {
  onChange: (checked: boolean) => void;
  checked: boolean
}

const SwitchPrivacy: FC<SwitchPrivacyProps> = ({ onChange ,checked}) => (
  <div className="flex items-center">
    <p className="pr-[15px] text-[15px] leading-none text-white">
      Make it public
    </p>
    <Switch.Root
      onCheckedChange={onChange}
      checked={checked}
      className="relative h-[15px] w-[30px] cursor-pointer rounded-full bg-neutral-700 outline-none data-[state=checked]:bg-green-500"
      id="airplane-mode"
    >
      <Switch.Thumb className="block h-[10px] w-[10px] translate-x-0.5 rounded-full bg-white transition-transform will-change-transform duration-100 data-[state=checked]:translate-x-[19px]" />
    </Switch.Root>
  </div>
);

export default SwitchPrivacy;
