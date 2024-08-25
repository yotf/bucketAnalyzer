import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { MultiListBoxProps } from "./MultiListBox";
import { SingleListBoxProps } from "./SingleListBox";


type ListBoxProps = (MultiListBoxProps & {multiple:true}) | SingleListBoxProps & {multiple:false} // just to ensure consistency

const BaseListBox: React.FC<ListBoxProps> = ({
  label,
  options,
  selected,
  onChange,
  multiple,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-40 mx-auto space-y-1">
        <Listbox value={selected} onChange={onChange} multiple={multiple}>
          <Label className="block text-sm font-medium ">{label}</Label>
          <div className="relative">
            <ListboxButton className=" bg-zinc-900  rounded cursor-pointer relative w-full font-semibold pl-3 pr-10 py-2 text-left  transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              <span className="block truncate w-full">
                {!multiple 
                  ? selected || `Choose ${label.toLowerCase()}`
                  : selected?.length==0? "All":`Choose ${label.toLowerCase()} (${selected.length})`
                    }
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
              className=" bg-zinc-800 z-50 w-40 max-h-60 rounded-md py-1 text-base leading-6 shadow-xl overflow-auto focus:outline-none sm:text-sm sm:leading-5 absolute text-left origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
              transition
            >
              {options.map((option) => (
                <ListboxOption
                  key={option}
                  value={option}
                  className=" truncate cursor-pointer select-none relative py-2 pl-10 pr-4 data-[focus]:bg-blue-100 data-[focus]:text-slate-800 text-left"

                  // onChange={() => toggleOption(file)}
                >
                  {option}
                  {multiple && selected.includes(option) && (
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
      </div>
    </div>
  );
};

export default BaseListBox;
