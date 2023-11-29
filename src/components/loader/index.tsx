import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FaSpinner style={{ fontSize: "50px", marginRight: "10px" }} />
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
