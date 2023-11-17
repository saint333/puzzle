import Delete from "./Delete";

interface PropsCubo extends React.HTMLAttributes<HTMLSpanElement> {
  size: "sm" | "lg";
  text: string | "";
}

export default function Cubo({
  size = "lg",
  text,
  ...args
}: PropsCubo) {
  const verifyText = text == "delete" ? <Delete /> : text;
  return (
    <>
      {size === "sm" ? (
        <span
          className={`w-[45px] h-[51px] rounded-[5px] flex text-[18px] cursor-pointer justify-center items-center capitalize dark:bg-[#565F7E!important] font-semibold`}
          {...args}
        >
          {verifyText}
        </span>
      ) : (
        <span
          className={`w-[75px] h-[75px] rounded-[5px] flex text-[35px] cursor-pointer justify-center items-center capitalize dark:bg-[#565F7E] font-semibold`}
          {...args}
        >
          {verifyText}
        </span>
      )}
    </>
  );
}
