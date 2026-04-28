export default interface Route {
  path: string;
  element: JSX.Element;
  subRoutes?: Route[];
  index?: boolean;
}
