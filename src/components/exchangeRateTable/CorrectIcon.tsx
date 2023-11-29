import { FaCheck } from "react-icons/fa";

const CorrectIcon = () => {
  return (
    <div className="absolute right-1 bottom-5 p-0.5 z-10 bg-white">
      <FaCheck className="fill-green-500" />
    </div>
  );
};

export default CorrectIcon;
