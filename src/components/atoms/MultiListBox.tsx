
import BaseListBox from "./BaseListBox";

export type MultiListBoxProps = {
  label: string;
  options: string[];
  onChange: (value: string[]) => void;
  selected: string[];
};


const MultiListBox: React.FC<MultiListBoxProps> = ({ label, options,selected,onChange }) => {

  return (
    <BaseListBox
      label={label}
      options={options}
      selected={selected}
      onChange={onChange}
      multiple
    />
  );
};

export default MultiListBox;
