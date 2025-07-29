import { useEffect, useState } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";

const OwnerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/adoption/adoption-request");
      setRequests(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch adoption requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, status) => {
    try {
      await api.post(`/adoption/adoption-request/${requestId}`, { status });
      toast.success(`Request ${status}`);
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      toast.error(`Failed to ${status} request`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🐾 Owner Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="text-center text-gray-500">
            No pending adoption requests.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between transition hover:shadow-xl"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Adoption Request
                  </h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium text-gray-700">Pet:</span>{" "}
                      {req.pet?.name || "Unknown Pet"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Customer:
                      </span>{" "}
                      {req.customer?.name || "Unknown Customer"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Status:</span>{" "}
                      <span className="capitalize text-blue-600">
                        {req.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Requested At:
                      </span>{" "}
                      {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleAction(req._id, "accepted")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl w-full transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl w-full transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
