import { ButtonHTMLAttributes } from "react";

type ButtonType = "button" | "submit" | "reset";

// type colorSetType =
//   | "blue"
//   | "red"
//   | "green"
//   | "yellow"
//   | "orange"
//   | "black"
//   | "gray"
//   | "purple";
interface ColorSetType {
    [key: string]: {
      backgroundColor: string;
      textColor: string;
    };
  }

interface Props {
  title?: string;
  type?: ButtonType;
  colorSet?: keyof ColorSetType;
  url?: string;
  className?: string;
  onClick?: () => void;
}

const colorSet: ColorSetType = {
  blue: {
    backgroundColor: "#060a5f",
    textColor: "#c6e8ff",
  },
  red: {
    backgroundColor: "#ff3535",
    textColor: "#120101",
  },
};

export default function MyButton({
  title = "",
  type = "button",
  colorSet: selectedColorSet = "blue",
  className,
  onClick
}: Props) {

    const selectedColor = colorSet[selectedColorSet] || colorSet.blue;

  return (
    <button
      type={type}
      style={{
        color: selectedColor.textColor,
        backgroundColor: selectedColor.backgroundColor,
      }}
      onClick={onClick}
      className={`hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className ?? ''}`}
    >
      {title}
    </button>
  );
}
