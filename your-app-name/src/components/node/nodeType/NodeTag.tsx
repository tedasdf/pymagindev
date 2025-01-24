


const symbolColor: Record<"class" | "function" | "constant", string> = {
    "class": "bg-sky-200",
    "function": "bg-violet-200",
    "constant": "bg-amber-200",
  };

const textColor: Record<"class" | "function" | "constant", string> = {
    "class": "text-sky-600",
    "function": "text-violet-600",
    "constant": "text-amber-600",
};
  
export const NodeTag = ({
    type,
  }: {
    type: "class" | "function" | "constant"; // Restrict type to specific string literals
  }) => {
    // Set a fallback color if the type doesn't match the symbolColor keys
    const labelBGColor = symbolColor[type] || "bg-gray-400"; // Default color
    const labelTextColor = textColor[type];

    return (
    <div
        style={{ borderRadius: "4px"}}
        className={`flex w-fit items-center gap-x-1 px-2 py-1 text-xs font-semibold text-black -ml-[1px] -mt-[1px] -mb-[1px] ${labelBGColor}`}
      >
        <p className={`${labelTextColor}`}>{type}</p>
      </div>
    );
};
  