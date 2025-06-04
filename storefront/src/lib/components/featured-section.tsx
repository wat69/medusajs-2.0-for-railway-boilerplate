import React from 'react'
import DeliveryIcon from '../../../public/img/svgs/delivery-icon'
import RefundIcon from '../../../public/img/svgs/refund-icon'
import DiscountIcon from '../../../public/img/svgs/discount-icon'
import SupportIcon from '../../../public/img/svgs/support-icon'

function FeaturedSection() {
  return (
    <div className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12">
          
          {/* Feature 1 - Shipping */}
          <div className="flex items-center gap-4 border-r-2 border-[#e9eaed]">
            <div className="text-amber-500">
            <DeliveryIcon />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Vi hjälper er med frakt</h3>
              <p className="text-gray-600 text-sm">Från Sveriges alla hörn</p>
            </div>
          </div>
          
          {/* Feature 2 - Pricing */}
          <div className="flex items-center gap-4 border-r-2 border-[#e9eaed]">
            <div className="text-amber-500">
              <RefundIcon />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Tydlig prissättning</h3>
              <p className="text-gray-600 text-sm">Betala för de tjänster ni får</p>
            </div>
          </div>
          
          {/* Feature 3 - No Hidden Fees */}
          <div className="flex items-center gap-4 border-r-2 border-[#e9eaed]">
            <div className="text-amber-500">
              <DiscountIcon />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ingen gris i säcken</h3>
              <p className="text-gray-600 text-sm">Vi besktar allt vi förmedlar</p>
            </div>
          </div>
          
          {/* Feature 4 - Support */}
          <div className="flex items-center gap-4">
            <div className="text-amber-500">
              <SupportIcon />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Tillgänglig Support</h3>
              <p className="text-gray-600 text-sm">Vi är Experter från branschen!</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default FeaturedSection