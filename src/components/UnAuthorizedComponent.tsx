const UnAuthorizedComponent = () => {
  return (
    <div className=" flex justify-center h-[calc(100vh-300px)] items-center">
      <p className=" font-medium font-serif text-xl text-red-500">
        Opps. You are not authorized to view this page. Please contact the
        administrator if you believe this is an error.
      </p>
    </div>
  );
};

export default UnAuthorizedComponent;
