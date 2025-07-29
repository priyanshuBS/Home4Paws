const Unauthorized = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-2">
        403 - Unauthorized
      </h1>
      <p className="text-gray-600">
        You do not have permission to view this page.
      </p>
    </div>
  );
};

export default Unauthorized;
