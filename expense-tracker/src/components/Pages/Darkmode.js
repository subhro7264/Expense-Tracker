import { MdLightMode } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { darkMode,lightMode } from '../../store/action'

function DarkModeSwitch() {
  const dispatch = useDispatch();
  const light = useSelector((state) => state.action.lightMode);
  const dark = useSelector((state) => state.action.darkMode);

  return (
    <>
      {light && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(lightMode());
            dispatch(darkMode());
          }}
        >
          <MdLightMode />
        </div>
      )}
      {dark && (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(darkMode());
            dispatch(lightMode());
          }}
        >
          <BsFillMoonFill />
        </div>
      )}
    </>
  );
}

export default DarkModeSwitch;
