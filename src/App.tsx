import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";

const App = () => {
  const nav = useNavigate();
  return (
    <>
      <Routes>
        {routes.map(({ path, element, subRoutes }, index) => {
          const renderSubRoutes = (subRoutes: any) => {
            return subRoutes.map(
              (
                { path, element, subRoutes, index: pageIndex }: any,
                index: number
              ) =>
                subRoutes ? (
                  <Route key={index} path={path} element={element}>
                    {renderSubRoutes(subRoutes)}
                  </Route>
                ) : (
                  <Route
                    index={pageIndex}
                    path={path}
                    element={element}
                    key={index}
                  />
                )
            );
          };

          return subRoutes ? (
            <Route key={index} path={path} element={element}>
              {renderSubRoutes(subRoutes)}
            </Route>
          ) : (
            <Route key={index} path={path} element={element} />
          );
        })}
        <Route
          path="*"
          element={
            <div className=" min-h-screen bg-neutral-900 flex gap-4 justify-center flex-col items-center">
              <p className=" text-3xl text-white">
                This feature is still in process.
              </p>
              <Button onClick={() => nav("/")} className=" h-12">
                Please click here to go back home!
              </Button>
            </div>
          }
          key="404"
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
