import { Outlet, useLocation, useNavigate } from "react-router-dom";

const VideoPage = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <div>
      <div className=" select-none flex justify-normal items-center border-b-[0.8px] border-b-dark/30 gap-4">
        <p
          onClick={() => nav("/video-list")}
          className={` ${
            pathname == "/video-list"
              ? "border-b-[3px] -mb-0.5 text-dark  border-blue-700"
              : " text-dark/60 text-lg"
          } cursor-pointer p-3 font-medium text-lg `}
        >
          Movie
        </p>
        <p
          onClick={() => nav("/video-list/series")}
          className={`${
            pathname == "/video-list/series" &&
            "border-b-[3px] -mb-0.5 !text-dark  border-blue-700"
          } p-3 font-medium cursor-pointer text-dark/60  text-lg`}
        >
          Series
        </p>
      </div>
      <div className=" mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default VideoPage;
