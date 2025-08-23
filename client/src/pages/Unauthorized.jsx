import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="py-32 flex items-center justify-center bg-gradient-to-br from-slate-100 to-white px-6">
      <div className="text-center max-w-xl space-y-6">
        <h1 className="text-[120px] leading-none font-bold text-slate-800 tracking-tight">
          403
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-700">
          Unauthorized Access
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          You don’t have the necessary permissions to view this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-block bg-slate-800 text-white hover:bg-slate-700 transition px-5 py-2 rounded-md text-sm font-medium cursor-pointer"
        >
          Go back to homepage
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
