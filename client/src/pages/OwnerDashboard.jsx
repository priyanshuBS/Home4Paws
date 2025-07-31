import { useEffect, useState } from "react";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleChat = async (petId, customerId) => {
    try {
      const res = await api.post("/chat/initiate", { petId, customerId });
      const conversationId = res.data?.data?._id;
      if (conversationId) {
        navigate(`/chat/${conversationId}`);
      } else {
        toast.error("Failed to start chat");
      }
    } catch (err) {
      toast.error("Chat initiation failed");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const statusColor = {
    pending: "bg-yellow-50 text-yellow-700 ring-yellow-300",
    accepted: "bg-emerald-50 text-emerald-700 ring-emerald-300",
    rejected: "bg-rose-50 text-rose-700 ring-rose-300",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-serif font-semibold text-center text-slate-800 mb-12 relative inline-block tracking-wide">
          <span className="relative z-10 text-gray-800">Owner Dashboard</span>
          <span className="absolute left-1/2 bottom-0 w-3/4 h-2 -translate-x-1/2 bg-pink-200 rounded-full z-0"></span>
        </h1>

        {loading ? (
          <div className="text-center text-gray-500 text-lg animate-pulse">
            Loading adoption requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No pending adoption requests.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ease-in-out h-full"
              >
                <div className="mb-5 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    📝 Adoption Request
                  </h2>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Pet:</span>{" "}
                    {req.pet?.name || "Unknown Pet"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Customer:</span>{" "}
                    {req.customer?.name || "Unknown Customer"}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span
                      className={`text-xs font-medium rounded-full px-3 py-1 ring-1 ${
                        statusColor[req.status] ||
                        "bg-gray-100 text-gray-700 ring-gray-300"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">
                      Requested At:
                    </span>{" "}
                    {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction(req._id, "accepted")}
                      className="flex-1 border border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all cursor-pointer"
                    >
                      <CheckCircle size={18} className="text-indigo-500" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "rejected")}
                      className="flex-1 border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all cursor-pointer"
                    >
                      <XCircle size={18} className="text-slate-500" />
                      Reject
                    </button>
                  </div>

                  <button
                    onClick={() => handleChat(req.pet?._id, req.customer?._id)}
                    className="w-full border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all cursor-pointer"
                  >
                    <MessageCircle size={18} className="text-emerald-500" />
                    Chat with Customer
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
