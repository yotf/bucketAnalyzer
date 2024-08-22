import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { cn } from "../utils";

type MultiListBoxProps = {
  label: string;
  options: string[];
  buttonLabel?: string;
};

const MultiListBox: React.FC<MultiListBoxProps> = ({ label, options }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      <Listbox value={selected} onChange={setSelected} multiple>
        <Label className="block text-sm leading-5 font-medium ">{label}</Label>
        <div className="relative">
          <ListboxButton className="cursor-default relative w-full  pl-3 pr-10 py-2 text-left  transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            <span className="block truncate">
              {`Choose ${label.toLowerCase()} (${selected.length})`}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </ListboxButton>

          <ListboxOptions
            className="  max-h-60 rounded-md py-1 text-base leading-6 shadow-xl overflow-auto focus:outline-none sm:text-sm sm:leading-5 absolute text-left origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            transition
          >
            {options.map((option) => (
              <ListboxOption
                key={option}
                value={option}
                className="cursor-pointer select-none relative py-2 pl-10 pr-4 data-[focus]:bg-blue-100 data-[focus]:text-slate-800 text-left"

                // onChange={() => toggleOption(file)}
              >
                {option}
                {selected.includes(option) && (
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-1.5`}
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </>
  );
};

export default MultiListBox;
