import { Button } from "@/components/button.component";
import { Input } from "@/components/input.component";
import { ChevronDown } from "lucide-react";

interface ShippingProps {
  loginForm: {
    email: string;
    password: string;
    zipCode: string;
  };
  setLoginForm: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      zipCode: string;
    }>
  >;
  shippingForm: {
    firstName: string;
    lastName: string;
    company: string;
    streetAddress1: string;
    streetAddress2: string;
    streetAddress3: string;
    streetAddress4: string;
    country: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  setShippingForm: (data: Partial<ShippingProps['shippingForm']>) => void;
  selectedShipping: "fixed" | "table";
  setSelectedShipping: (method: "fixed" | "table") => void;
  handleLogin: () => void;
  handleBackToCart: () => void;
  handleNextToReview: () => void;
}

export default function Shipping({
  loginForm,
  setLoginForm,
  shippingForm,
  setShippingForm,
  selectedShipping,
  setSelectedShipping,
  handleLogin,
  handleBackToCart,
  handleNextToReview,
}: ShippingProps) {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Shipping Address
        </h2>

        <div className="mb-8">
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <label className="text-sm text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="col-span-3 h-10 border border-gray-300 rounded px-3"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <label className="text-sm text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="col-span-3 h-10 border border-gray-300 rounded px-3"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <label className="text-sm text-gray-700">Zip/Postal Code</label>
              <Input
                type="text"
                value={loginForm.zipCode}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, zipCode: e.target.value }))
                }
                placeholder="Zip Code"
                className="col-span-3 h-10 border border-gray-300 rounded px-3"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            You already have an account with us. Sign in or continue as guest
          </p>

          <div className="flex items-center space-x-4">
            <Button
              onClick={handleLogin}
              className="bg-[#7DB800] hover:bg-[#6BA700] text-white px-6 py-2 rounded text-sm font-medium"
            >
              Login
            </Button>
            <button className="text-gray-600 hover:underline text-sm">
              Forgot Your Password?
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={shippingForm.firstName}
              onChange={(e) =>
                setShippingForm({ firstName: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={shippingForm.lastName}
              onChange={(e) =>
                setShippingForm({ lastName: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">Company</label>
            <Input
              type="text"
              value={shippingForm.company}
              onChange={(e) =>
                setShippingForm({ company: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-start">
            <label className="text-sm text-gray-700 pt-2">Street Address <span className="text-red-500">*</span></label>
            <textarea
              value={shippingForm.streetAddress1}
              onChange={(e) => setShippingForm({ streetAddress1: e.target.value })}
              className="col-span-3 h-24 border border-gray-300 rounded px-3 py-2 resize-none text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">Street Address 2</label>
            <Input
              type="text"
              value={shippingForm.streetAddress2}
              onChange={(e) =>
                setShippingForm({ streetAddress2: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">Street Address 3</label>
            <Input
              type="text"
              value={shippingForm.streetAddress3}
              onChange={(e) =>
                setShippingForm({ streetAddress3: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">Street Address 4</label>
            <Input
              type="text"
              value={shippingForm.streetAddress4}
              onChange={(e) =>
                setShippingForm({ streetAddress4: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">
              Country <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={shippingForm.country}
              onChange={(e) =>
                setShippingForm({ country: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">
              State/Province <span className="text-red-500">*</span>
            </label>
            <div className="col-span-3 relative">
              <select
                className="w-full h-10 px-3 border border-gray-300 rounded bg-white appearance-none pr-8 text-sm"
                value={shippingForm.state}
                onChange={(e) =>
                  setShippingForm({ state: e.target.value })
                }
                required
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
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">
              Phone Number
            </label>
            <Input
              type="tel"
              value={shippingForm.phone}
              onChange={(e) =>
                setShippingForm({ phone: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">
              Zip/Postal Code
            </label>
            <Input
              type="text"
              value={shippingForm.zipCode}
              onChange={(e) =>
                setShippingForm({ zipCode: e.target.value })
              }
              className="col-span-3 h-10 border border-gray-300 rounded px-3"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Shipping Methods
        </h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="fixed"
              name="shipping"
              value="fixed"
              checked={selectedShipping === "fixed"}
              onChange={(e) => setSelectedShipping(e.target.value as "fixed")}
              className="h-4 w-4 text-[#7DB800] focus:ring-[#7DB800] border-gray-300"
            />
            <label htmlFor="fixed" className="ml-3 text-sm text-gray-700">
              <span className="font-medium">$5.00</span> - Fixed - Flat Rate
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="table"
              name="shipping"
              value="table"
              checked={selectedShipping === "table"}
              onChange={(e) => setSelectedShipping(e.target.value as "table")}
              className="h-4 w-4 text-[#7DB800] focus:ring-[#7DB800] border-gray-300"
            />
            <label htmlFor="table" className="ml-3 text-sm text-gray-700">
              <span className="font-medium">$15.00</span> - Table Rate - Best
              Way
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 mt-8">
        <Button
          variant="outline"
          onClick={handleBackToCart}
          className="px-8 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back
        </Button>
        <Button
          onClick={handleNextToReview}
          className="bg-[#7DB800] hover:bg-[#6BA700] text-white px-8 py-2"
        >
          Next
        </Button>
      </div>
    </>
  );
}