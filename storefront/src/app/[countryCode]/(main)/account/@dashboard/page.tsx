"use client";

import { useState } from "react";
import { Camera, User, Mail, Phone, Lock, MapPin } from "lucide-react";
import { toast } from "@lib/components/ui/sonner";

import ProfilePhone            from "@modules/account/components/profile-phone";
import ProfileBillingAddress  from "@modules/account/components/profile-billing-address";
import ProfileEmail           from "@modules/account/components/profile-email";
import ProfileName            from "@modules/account/components/profile-name";
import ProfilePassword        from "@modules/account/components/profile-password";

export default function ProfileClient({ customer, regions }: {
  customer: any;
  regions: any[];
}) {
  const [agreed, setAgreed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleBecomeVendor() {
    if (!agreed) {
      toast.error("Du måste godkänna villkoren för att bli säljare.");
      return;
    }
    if (pwd.length < 6) {
      toast.error("Lösenordet måste vara minst 6 tecken långt.");
      return;
    }
    if (pwd !== pwd2) {
      toast.error("Lösenorden matchar inte.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/promote-vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const body = await res.json();
      if (res.ok) {
        toast.success("Du har nu blivit säljare!", {
          description: "Du kan nu skapa och hantera dina annonser.",
        });
      } else {
        toast.error("Misslyckades", { description: body.error });
      }
    } catch (err) {
      console.error(err);
      toast.error("Tekniskt fel", {
        description: "Nätverksproblem, försök igen.",
      });
    } finally {
      setLoading(false);
    }
  }

  const ProfileCard = ({ icon: Icon, title, children }: any) => (
    <div className="rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-2xl font-semibold">
                  {customer.first_name?.[0]}
                  {customer.last_name?.[0]}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-1 bg-gray-800 hover:bg-gray-700 rounded-full p-2 border-2 border-white">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Välkommen {customer.first_name} {customer.last_name}!
              </h1>
              <p className="text-gray-600">
                Hantera din profil, eller bli säljare och skapa annonser.
              </p>
            </div>
          </div>

          {/* Vendor‐sektion */}
          <div className="border-t pt-6">
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              Jag godkänner villkoren för att bli säljare.
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="password"
                placeholder="Lösenord"
                className="border p-2 rounded flex-1"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <input
                type="password"
                placeholder="Upprepa lösenord"
                className="border p-2 rounded flex-1"
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
              />
            </div>
            <button
              onClick={handleBecomeVendor}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              {loading ? "Skapar konto…" : "Bli säljare"}
            </button>
          </div>
        </div>

        {/* Profilkort */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProfileCard icon={User} title="Personlig information">
            <ProfileName customer={customer} />
          </ProfileCard>
          <ProfileCard icon={Mail} title="E-postadress">
            <ProfileEmail customer={customer} />
          </ProfileCard>
          <ProfileCard icon={Phone} title="Telefonnummer">
            <ProfilePhone customer={customer} />
          </ProfileCard>
          <ProfileCard icon={Lock} title="Säkerhet">
            <ProfilePassword customer={customer} />
          </ProfileCard>
        </div>

        {/* Faktureringsadress */}
        <ProfileCard icon={MapPin} title="Faktureringsadress">
          <ProfileBillingAddress customer={customer} regions={regions} />
        </ProfileCard>
      </div>
    </div>
  );
}
