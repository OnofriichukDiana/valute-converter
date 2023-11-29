import { MdOutlineModeEdit } from "react-icons/md";

const EditIcon = () => {
  return (
    <div className="absolute right-1 bottom-5 p-0.5 z-10 bg-white input-edit-icon">
      <MdOutlineModeEdit className="fill-cyan-600" />
    </div>
  );
};

export default EditIcon;
