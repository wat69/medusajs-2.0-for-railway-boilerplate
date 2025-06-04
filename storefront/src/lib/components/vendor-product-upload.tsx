
"use client";

import { useState } from "react";
import { 
  Tag, 
  Briefcase, 
  DollarSign, 
  ImageIcon,
  Package,
  Ruler,
  Weight,
  Globe,
  Layers,
  Hash,
  FileText,
  X,
  Upload
} from "lucide-react";
import { createVendorProduct } from "@lib/data/vendor";

interface ProductVariant {
  title: string;
  prices: { currency_code: string; amount: number }[];
  options: Record<string, string>;
}

function VendorProductUpload({ customer}: any) {
  const [productData, setProductData] = useState({
    title: "",
    subtitle: "",
    description: "",
    handle: "",
    status: "draft",
    is_giftcard: false,
    discountable: true,
    material: "",
    origin_country: "",
    hs_code: "",
    mid_code: "",
    weight: "",
    width: "",
    height: "",
    length: "",
    external_id: "",
    options: [{ title: "Color", values: ["Blue"] }],
    variants: [] as ProductVariant[],
  });

  const [files, setFiles] = useState<File[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      
      // Add all form fields to FormData
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "options" || key === "variants") {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "boolean") {
          formData.append(key, value.toString());
        } else if (value !== "") {
          formData.append(key, value.toString());
        }
      });

      // Add all selected files to FormData
      files.forEach((file) => {
        formData.append("files", file);
      });

      const result = await createVendorProduct(formData);
      if (result.success) {
        setSuccessMessage("Your product has been uploaded successfully. It will be published after admin review.");
        // Reset form
        setProductData({
          title: "",
          subtitle: "",
          description: "",
          handle: "",
          status: "draft",
          is_giftcard: false,
          discountable: true,
          material: "",
          origin_country: "",
          hs_code: "",
          mid_code: "",
          weight: "",
          width: "",
          height: "",
          length: "",
          external_id: "",
          options: [{ title: "Color", values: ["Blue"] }],
          variants: [] as ProductVariant[],
        });
        setFiles([]);
      } else {
        console.error("Product upload failed", result.error);
        setSuccessMessage("Failed to upload the product. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error", error);
      setSuccessMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const updateProductData = (key: string, value: any) => {
    setProductData({ ...productData, [key]: value });
  };

  const renderFileUploadSection = () => (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
            >
              Choose Files
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Upload multiple images (PNG, JPG, GIF up to 10MB each)
          </p>
        </div>
      </div>

      {/* Display selected files */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderBasicFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <Tag className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Product Title*"
          value={productData.title}
          onChange={(e) => updateProductData("title", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <Tag className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Product Subtitle"
          value={productData.subtitle}
          onChange={(e) => updateProductData("subtitle", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <Hash className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Product Handle (URL slug)"
          value={productData.handle}
          onChange={(e) => updateProductData("handle", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <Briefcase className="w-5 h-5 text-gray-500" />
        <textarea
          placeholder="Product Description"
          value={productData.description}
          onChange={(e) => updateProductData("description", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none h-20 resize-none"
        />
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <DollarSign className="w-5 h-5 text-gray-500" />
        <input
          type="number"
          placeholder="Price*"
          onChange={(e) =>
            updateProductData("variants", [
              {
                title: productData.title,
                prices: [
                  { currency_code: "eur", amount: Number(e.target.value) },
                ],
                options: { Color: "Blue" },
              },
            ])
          }
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="giftcard"
          checked={productData.is_giftcard}
          onChange={(e) => updateProductData("is_giftcard", e.target.checked)}
          className="w-4 h-4 text-blue-600"
        />
        <label htmlFor="giftcard" className="text-sm text-gray-700">
          This is a gift card
        </label>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="discountable"
          checked={productData.discountable}
          onChange={(e) => updateProductData("discountable", e.target.checked)}
          className="w-4 h-4 text-blue-600"
        />
        <label htmlFor="discountable" className="text-sm text-gray-700">
          Product can be discounted
        </label>
      </div>
    </div>
  );

  const renderPhysicalFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
          <Weight className="w-5 h-5 text-gray-500" />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={productData.weight}
            onChange={(e) => updateProductData("weight", e.target.value)}
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
          <Ruler className="w-5 h-5 text-gray-500" />
          <input
            type="number"
            placeholder="Width (cm)"
            value={productData.width}
            onChange={(e) => updateProductData("width", e.target.value)}
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
          <Ruler className="w-5 h-5 text-gray-500" />
          <input
            type="number"
            placeholder="Height (cm)"
            value={productData.height}
            onChange={(e) => updateProductData("height", e.target.value)}
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
          <Ruler className="w-5 h-5 text-gray-500" />
          <input
            type="number"
            placeholder="Length (cm)"
            value={productData.length}
            onChange={(e) => updateProductData("length", e.target.value)}
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <Layers className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Material"
          value={productData.material}
          onChange={(e) => updateProductData("material", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <Globe className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Origin Country"
          value={productData.origin_country}
          onChange={(e) => updateProductData("origin_country", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>
    </div>
  );

  const renderAdditionalFields = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <FileText className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="HS Code"
          value={productData.hs_code}
          onChange={(e) => updateProductData("hs_code", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <FileText className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="MID Code"
          value={productData.mid_code}
          onChange={(e) => updateProductData("mid_code", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3">
        <Package className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="External ID"
          value={productData.external_id}
          onChange={(e) => updateProductData("external_id", e.target.value)}
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      {/* File upload section moved here */}
      {renderFileUploadSection()}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-4">Upload Your Product</h2>
        <p className="text-center text-gray-600 mb-6">
          Fill in the details below to upload your product.
        </p>

        {successMessage && (
          <div
            className={`mb-4 text-sm font-medium p-3 rounded-lg ${successMessage.includes("successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
              }`}
          >
            {successMessage}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("basic")}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === "basic"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab("physical")}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === "physical"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Physical Properties
          </button>
          <button
            onClick={() => setActiveTab("additional")}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === "additional"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Additional Info & Images
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "basic" && renderBasicFields()}
        {activeTab === "physical" && renderPhysicalFields()}
        {activeTab === "additional" && renderAdditionalFields()}

        <button
          onClick={handleSubmit}
          disabled={files.length === 0}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-lg transition duration-200 mt-6"
        >
          Upload Product {files.length > 0 && `(${files.length} images)`}
        </button>
      </div>
    </div>
  );
}

export default VendorProductUpload;