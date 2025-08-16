"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ShippingEstimateProps {
  onShippingChange: (rate: number) => void;
}

export function Shipping({ onShippingChange }: ShippingEstimateProps) {
  const [country, setCountry] = useState("daisy.watson@example.com");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("fixed");

  const handleShippingChange = (value: string) => {
    setSelectedShipping(value);
    const rate = value === "fixed" ? 5.0 : 15.0;
    onShippingChange(rate);
  };

  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-gray-900 mb-4">
        Estimate Shipping and Tax
      </h4>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <div className="relative">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-3 text-sm border border-gray-300 rounded bg-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{
                height: "44px",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              <option value="">
                Please select a country
              </option>
              <option value="Indonesia">Indonesia</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/Province
          </label>
          <div className="relative">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-3 text-sm border border-gray-300 rounded bg-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{
                height: "44px",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              <option value="">
                Please select a region, state or province
              </option>
              <option value="AC">Aceh</option>
              <option value="SU">Sumatera Utara</option>
              <option value="SB">Sumatera Barat</option>
              <option value="RI">Riau</option>
              <option value="KR">Kepulauan Riau</option>
              <option value="JA">Jambi</option>
              <option value="SS">Sumatera Selatan</option>
              <option value="BB">Bangka Belitung</option>
              <option value="BE">Bengkulu</option>
              <option value="LA">Lampung</option>
              <option value="JK">DKI Jakarta</option>
              <option value="JB">Jawa Barat</option>
              <option value="JT">Jawa Tengah</option>
              <option value="YO">DI Yogyakarta</option>
              <option value="JI">Jawa Timur</option>
              <option value="BA">Bali</option>
              <option value="NB">Nusa Tenggara Barat</option>
              <option value="NT">Nusa Tenggara Timur</option>
              <option value="KB">Kalimantan Barat</option>
              <option value="KT">Kalimantan Tengah</option>
              <option value="KS">Kalimantan Selatan</option>
              <option value="KI">Kalimantan Timur</option>
              <option value="KU">Kalimantan Utara</option>
              <option value="SA">Sulawesi Utara</option>
              <option value="ST">Sulawesi Tengah</option>
              <option value="SG">Sulawesi Tenggara</option>
              <option value="SR">Sulawesi Barat</option>
              <option value="SN">Sulawesi Selatan</option>
              <option value="GO">Gorontalo</option>
              <option value="MA">Maluku</option>
              <option value="MU">Maluku Utara</option>
              <option value="PA">Papua</option>
              <option value="PB">Papua Barat</option>
              <option value="PP">Papua Pegunungan</option>
              <option value="PS">Papua Selatan</option>
              <option value="PM">Papua Tengah</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zip/Postal Code
          </label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full px-3 py-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{
              height: "44px",
              fontSize: "14px",
            }}
            placeholder=""
          />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <h5 className="text-xs font-medium text-gray-700 mb-2">Flat Rate</h5>
          <div className="flex items-center">
            <input
              type="radio"
              id="fixed"
              name="shipping"
              value="fixed"
              checked={selectedShipping === "fixed"}
              onChange={(e) => handleShippingChange(e.target.value)}
              className="h-3 w-3 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="fixed" className="ml-2 text-xs text-gray-700">
              Fixed $5.00
            </label>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-medium text-gray-700 mb-2">Best Way</h5>
          <div className="flex items-center">
            <input
              type="radio"
              id="table"
              name="shipping"
              value="table"
              checked={selectedShipping === "table"}
              onChange={(e) => handleShippingChange(e.target.value)}
              className="h-3 w-3 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="table" className="ml-2 text-xs text-gray-700">
              Table Rate $15.00
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
