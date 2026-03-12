
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const TrackShipment = () => {

  const [trackingId, setTrackingId] =
    useState("");

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleTrack = async () => {

    if (!trackingId.trim()) {

      alert("Please enter Tracking ID");
      return;

    }

    try {

      setLoading(true);
      setError("");
      setData(null);

      const res = await fetch(
        `${API_BASE}/track/${trackingId}`
      );

      const result = await res.json();

      setLoading(false);

      if (!result.success) {

        setError(result.message);
        return;

      }

      setData(result.consignment);

    } catch (err) {

      setLoading(false);

      setError(
        "Failed to fetch tracking data"
      );

    }

  };

  return (

    <section className="relative z-30 px-4 sm:px-6">



      <div className="
        max-w-4xl mx-auto
        bg-white rounded-2xl
        shadow-[0_20px_50px_-15px_#b21f2d40]
        p-5 sm:p-6 md:p-8
      ">

        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8 text-[#b21f2d]">
          Track Your Shipment
        </h2>

        {/* SEARCH */}

        <div className="flex flex-col md:flex-row gap-4">

          <div className="
            flex items-center w-full
            border rounded-lg
            px-4 py-3
            bg-[#b21f2d15]
          ">

            <FiSearch
              className="text-[#b21f2d] mr-3"
              size={18}
            />

            <input
              type="text"
              value={trackingId}
              onChange={(e) =>
                setTrackingId(e.target.value)
              }
              placeholder="Track Your Shipment"
              className="
                w-full bg-transparent outline-none
                text-[#140826]
              "
            />

          </div>

          <button
            onClick={handleTrack}
            className="
              bg-[#b21f2d]
              hover:bg-[#9b1b26]
              text-white font-semibold
              px-10 py-3
              rounded-lg
            "
          >

            {loading
              ? "Tracking..."
              : "Track"}

          </button>

        </div>


        {/* ERROR */}

        {error && (

          <div className="
            text-red-600
            mt-6
            font-semibold
          ">
            {error}
          </div>

        )}


        {data && (

          <div className="mt-8 border-t pt-6">

            <div className="max-w-3xl mx-auto border border-gray-300 rounded-lg overflow-hidden">

              {/* HEADER */}
              <div className="bg-[#b21f2d] text-white text-center font-bold py-3">
                SHIPMENT DETAILS
              </div>

              <table className="w-full text-sm">

                <tbody>

                  <tr className="border-b">
                    <td className="bg-gray-100 font-semibold p-3 w-1/3">
                      Tracking ID:
                    </td>
                    <td className="p-3">
                      {data.trackingId}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="bg-gray-100 font-semibold p-3">
                      Customer:
                    </td>
                    <td className="p-3">
                      {data.customerName}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="bg-gray-100 font-semibold p-3">
                      Phone:
                    </td>
                    <td className="p-3">
                      {data.phone}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="bg-gray-100 font-semibold p-3">
                      Origin:
                    </td>
                    <td className="p-3">
                      {data.origin}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="bg-gray-100 font-semibold p-3">
                      Destination:
                    </td>
                    <td className="p-3">
                      {data.destination}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="bg-gray-100 font-semibold p-3">
                      Courier:
                    </td>
                    <td className="p-3">
                      {data.courierCompany}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="bg-gray-100 font-semibold p-3">
                      Status:
                    </td>
                    <td className="p-3 font-bold text-green-600">
                      {data.status}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="bg-gray-100 font-semibold p-3">
                      Shipment Date:
                    </td>
                    <td className="p-3">
                      {new Date(data.shipmentDate).toLocaleDateString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="bg-gray-100 font-semibold p-3">
                      Expected Delivery:
                    </td>
                    <td className="p-3">
                      {new Date(data.expectedDeliveryDate).toLocaleDateString()}
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

            <a
              href={
                data.courierLink.startsWith("http")
                  ? data.courierLink
                  : `https://${data.courierLink}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-[#b21f2d] text-white px-6 py-3 rounded-lg hover:bg-[#9b1b26]"
            >
              Track on Courier Website
            </a>

          </div>

        )}

      </div>

    </section>

  );

};

export default TrackShipment;
