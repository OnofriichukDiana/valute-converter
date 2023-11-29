import { IoMdClose } from "react-icons/io";

const ErrorIcon = () => {
  return (
    <div className="absolute right-1 bottom-5 p-0.5 z-10 bg-white">
      <IoMdClose className="fill-red-600" />
    </div>
  );
};

export default ErrorIcon;
