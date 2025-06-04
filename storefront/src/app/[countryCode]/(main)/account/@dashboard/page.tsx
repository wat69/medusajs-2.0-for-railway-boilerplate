import { Metadata } from "next"
import { useRef } from "react"
import { Camera, User, Mail, Phone, Lock, MapPin } from "lucide-react"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Saint Clothing profile.",
}

export default async function Profile() {
  const customer = await getCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  const ProfileCard = ({ 
    icon: Icon, 
    title, 
    children, 
    notificationCount 
  }: {
    icon: any,
    title: string,
    children: React.ReactNode,
    notificationCount?: number
  }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-gray-700" />
              </div>
              {notificationCount && (
                <div className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  {notificationCount}
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>
        </div>
        {children}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4" data-testid="profile-page-wrapper">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center gap-6 mb-6 md:mb-0">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 text-2xl font-semibold">
                    {customer.first_name?.[0]}{customer.last_name?.[0]}
                  </span>
                </div>
                {/* Camera Icon */}
                <button className="absolute -bottom-2 -right-1 bg-gray-800 hover:bg-gray-700 rounded-full p-2 border-2 border-white z-10 transition-colors duration-200 cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Profile Info */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome {customer.first_name} {customer.last_name}!
                </h1>
                <p className="text-gray-600">
                  Manage your Krossförmedlingen profile and preferences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Management Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profile Name Card */}
          <ProfileCard icon={User} title="Personal Information" notificationCount={1}>
            <ProfileName customer={customer} />
          </ProfileCard>

          {/* Email Card */}
          <ProfileCard icon={Mail} title="Email Address">
            <ProfileEmail customer={customer} />
          </ProfileCard>

          {/* Phone Card */}
          <ProfileCard icon={Phone} title="Phone Number">
            <ProfilePhone customer={customer} />
          </ProfileCard>

          {/* Password Card */}
          <ProfileCard icon={Lock} title="Security" notificationCount={1}>
            <ProfilePassword customer={customer} />
          </ProfileCard>
        </div>

        {/* Billing Address Card - Full Width */}
        <div className="mb-8">
          <ProfileCard icon={MapPin} title="Billing Address">
            <ProfileBillingAddress customer={customer} regions={regions} />
          </ProfileCard>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-700">
                Profile information updated
              </p>
              <span className="text-sm text-gray-500 ml-auto">
                2 hours ago
              </span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-700">
                Email preferences updated
              </p>
              <span className="text-sm text-gray-500 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-gray-700">Password changed successfully</p>
              <span className="text-sm text-gray-500 ml-auto">
                3 days ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}