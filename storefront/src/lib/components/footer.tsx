import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@lib/components/ui/input'
import { Button } from '@lib/components/ui/button'
import { Facebook, Twitter, Linkedin, Video, MapPin } from 'lucide-react'
import logo_img from "../../../public/img/logo_img.svg";
import location from "../../../public/img/location.svg"
import mail from "../../../public/img/mail.svg"


function Footer() {
  return (
    <footer className="bg-gray-50 py-16 border-t ">
      <div className="container mx-auto max-w-6xl px-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 - Logo and Contact */}
        <div className="space-y-6">
          <div className="mb-8">
            <Image 
              src={logo_img} 
              alt="Kross-Förmedlingen" 
              // width={200} 
              // height={80} 
              className="h-auto"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">Got Questions? Call us</p>
            <p className="text-2xl font-bold">+670 413 90 762</p>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Image src={mail} alt="mail" width={18} height={18} />
              <span>shofy@support.com</span>
            </div>
            
            <div className="flex items-start gap-2 text-gray-600">
              <Image src={location} alt="location" width={18} height={18} />
              <span>79 Sleepy Hollow St.<br />Jamaica, New York 1432</span>
            </div>
          </div>
        </div>

        {/* Column 2 - My Account */}
        <div>
          <h3 className="text-xl font-bold mb-6">My Account</h3>
          <ul className="space-y-4">
            {[
              { text: 'Track Orders', href: '/orders' },
              { text: 'Shipping', href: '/shipping' },
              { text: 'Wishlist', href: '/wishlist' },
              { text: 'My Account', href: '/account' },
              { text: 'Order History', href: '/order-history' },
              { text: 'Returns', href: '/returns' },
            ].map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="text-gray-600 hover:text-black flex items-center gap-2">
                  <span className="text-lg">•</span> {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Information */}
        <div>
          <h3 className="text-xl font-bold mb-6">Information</h3>
          <ul className="space-y-4">
            {[
              { text: 'Our Story', href: '/our-story' },
              { text: 'Careers', href: '/careers' },
              { text: 'Privacy Policy', href: '/privacy-policy' },
              { text: 'Terms & Conditions', href: '/terms' },
              { text: 'Latest News', href: '/news' },
              { text: 'Contact Us', href: '/contact' },
            ].map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="text-gray-600 hover:text-black flex items-center gap-2">
                  <span className="text-lg">•</span> {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Subscribe */}
        <div>
          <h3 className="text-xl font-bold mb-6">Subscribe.</h3>
          <p className="text-gray-600 mb-6">Our conversation is just getting started</p>
          
          <div className="flex mb-8">
            <Input 
              type="email" 
              placeholder="Enter Your Email" 
              className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="rounded-l-none bg-black hover:bg-gray-800">
              Subscribe
            </Button>
          </div>
          
          <div>
            <p className="text-gray-800 font-medium mb-4">Follow Us On</p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <Video size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer