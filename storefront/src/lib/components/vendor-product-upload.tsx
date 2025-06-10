"use client";
import { toast } from "@lib/components/ui/sonner"; 
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
  Upload,
  MapPin,
  CheckSquare
} from "lucide-react";
import { createVendorProduct } from "@lib/data/vendor";

interface ProductVariant {
  title: string;
  prices: { currency_code: string; amount: number }[];
  options: Record<string, string>;
}

function VendorProductUpload({ customer }: any) {
  const [productData, setProductData] = useState<any>({
    title: "",
    description: "",
    model_year: "",
    manufacturer: "",
    model: "",
    operating_hours: "",
    location: "",
    weight: "",
    width: "",
    height: "",
    length: "",
    price: "",
    can_deliver: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("step1");

  const updateProductData = (key: string, value: any) => {
    setProductData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "document") => {
    const selected = event.target.files ? Array.from(event.target.files) : [];
    if (type === "image") setFiles(prev => [...prev, ...selected]);
    else setDocuments(prev => [...prev, ...selected]);
  };

  const removeFile = (index: number, type: "image" | "document") => {
    if (type === "image") setFiles(prev => prev.filter((_, i) => i !== index));
    else setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const variant = {
        title: productData.title,
        prices: [{ currency_code: "sek", amount: parseInt(productData.price) * 100 }],
        options: {},
        manage_inventory: true,
        inventory_quantity: 1
      };

      const metadata = {
        seller_id: customer.id,
        model_year: productData.model_year,
        manufacturer: productData.manufacturer,
        model: productData.model,
        operating_hours: productData.operating_hours,
        location: productData.location,
        can_deliver: productData.can_deliver
      };

      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("status", "draft");
      formData.append("metadata", JSON.stringify(metadata));
      formData.append("variants", JSON.stringify([variant]));

      files.forEach((file) => formData.append("images", file));
      documents.forEach((file) => formData.append("documents", file));

      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
              toast.success("Annons uppladdad!", {
                description: "Din annons är inskickad. Vi kommer nu granska och godkänna den.",
              });
             } else {
              toast.error("Misslyckades", {
                description: "Kunde inte skapa produkten. Försök igen.",
              });
             }
    } catch (error) {
      console.error(error);
        toast.error("Tekniskt fel", {
          description: "Nätverksproblem eller serverfel. Vänligen försök igen.",
        });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-2xl  shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Skapa ny annons</h2>

        {successMessage && (
          <div className="mb-4 p-3 rounded text-sm font-medium bg-green-100 text-green-800">
            {successMessage}
          </div>
        )}

        {/* Fliknavigering */}
        <div className="flex border-b mb-6">
          {[
            { key: "step1", label: "Information" },
            { key: "step2", label: "Mått & Pris" },
            { key: "step3", label: "Bilder & Dokument" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Steg 1 */}
        {activeTab === "step1" && (
          <div className="space-y-4">
            <input className="w-full border p-2" placeholder="Kategori" onChange={e => updateProductData("category", e.target.value)} />
            <input className="w-full border p-2" placeholder="Produktnamn" value={productData.title} onChange={e => updateProductData("title", e.target.value)} />
            <textarea className="w-full border p-2" placeholder="Beskrivning" value={productData.description} onChange={e => updateProductData("description", e.target.value)} />
            <input className="w-full border p-2" placeholder="Årsmodell" value={productData.model_year} onChange={e => updateProductData("model_year", e.target.value)} />
            <input className="w-full border p-2" placeholder="Tillverkare" value={productData.manufacturer} onChange={e => updateProductData("manufacturer", e.target.value)} />
            <input className="w-full border p-2" placeholder="Modell" value={productData.model} onChange={e => updateProductData("model", e.target.value)} />
            <input className="w-full border p-2" placeholder="Drifttimmar" value={productData.operating_hours} onChange={e => updateProductData("operating_hours", e.target.value)} />
            <button onClick={() => setActiveTab("step2")} className="bg-blue-600 text-white px-4 py-2 rounded">Nästa steg →</button>
          </div>
        )}

        {/* Steg 2 */}
        {activeTab === "step2" && (
          <div className="space-y-4">
            <input className="w-full border p-2" placeholder="Vikt (kg)" value={productData.weight} onChange={e => updateProductData("weight", e.target.value)} />
            <input className="w-full border p-2" placeholder="Bredd (cm)" value={productData.width} onChange={e => updateProductData("width", e.target.value)} />
            <input className="w-full border p-2" placeholder="Höjd (cm)" value={productData.height} onChange={e => updateProductData("height", e.target.value)} />
            <input className="w-full border p-2" placeholder="Längd (cm)" value={productData.length} onChange={e => updateProductData("length", e.target.value)} />
            <input className="w-full border p-2" placeholder="Ort" value={productData.location} onChange={e => updateProductData("location", e.target.value)} />
            <input className="w-full border p-2" placeholder="Pris (SEK)" value={productData.price} onChange={e => updateProductData("price", e.target.value)} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={productData.can_deliver} onChange={e => updateProductData("can_deliver", e.target.checked)} />
              Kan hjälpa till med leverans
            </label>
            <button onClick={() => setActiveTab("step3")} className="bg-blue-600 text-white px-4 py-2 rounded">Nästa steg →</button>
          </div>
        )}

        {/* Steg 3 */}
        {activeTab === "step3" && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Bilder</label>
              <input type="file" multiple accept="image/*" onChange={e => handleFileSelect(e, "image")} className="block mt-1" />
              {files.map((file, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-600 mt-1">
                  {file.name}
                  <button onClick={() => removeFile(i, "image")} className="text-red-500">Ta bort</button>
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium">Dokument (PDF, Protokoll etc)</label>
              <input type="file" multiple onChange={e => handleFileSelect(e, "document")} className="block mt-1" />
              {documents.map((file, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-600 mt-1">
                  {file.name}
                  <button onClick={() => removeFile(i, "document")} className="text-red-500">Ta bort</button>
                </div>
              ))}
            </div>

            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded w-full">Skapa annons</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorProductUpload;
