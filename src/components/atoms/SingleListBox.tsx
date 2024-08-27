import BaseListBox from "./BaseListBox";

export type SingleListBoxProps = {
  label?: string;
  options: string[];
  selected?: string;
  onChange: (value: string) => void;
};

const SingleListBox: React.FC<SingleListBoxProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  return (
    <BaseListBox
      label={label}
      options={options}
      multiple={false}
      selected={selected}
      onChange={onChange}
    />
  );
};

export default SingleListBox;
