import { IoCheckmarkCircleSharp, IoChevronDownSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

interface DropdownProps {
  options: { value: number | string; label: string }[];
  selected: unknown;
  setSelected: (arg0: unknown) => void;
  classNames: string[];
  defaultText: string;
}

export default function Dropdown({
  options,
  selected,
  setSelected,
  classNames,
  defaultText,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    setSelected(value);
    setIsOpen(false);
    1;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (event.target as Node) instanceof Node &&
      !(event.target as HTMLElement).closest(`.${styles.dropdownContainer}`)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const buttonText =
    Array.isArray(selected) && selected.length > 0
      ? String(selected[0])
      : String(selected) || defaultText;

  return (
    <div
      className={[
        styles.dropdownContainer,
        isOpen ? styles.open : styles.closed,
        ...classNames,
      ].join(' ')}
    >
      <button onClick={() => setIsOpen(!isOpen)}>
        {buttonText}
        <IoChevronDownSharp className={isOpen ? styles.invert : undefined} />
      </button>
      <ul>
        {options.map((option) => (
          <li key={option.value}>
            <button value={option.value} onClick={handleOptionClick}>
              {option.label}
              {selected === option.value ||
              (Array.isArray(selected) && selected.includes(option.value)) ? (
                <IoCheckmarkCircleSharp />
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
