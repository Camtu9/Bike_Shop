// components/FeaturedCard.tsx
'use client'
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { assets } from '@/assets/assets'

interface Props {
  image: StaticImageData
  title: string
  description: string
  onClick?: () => void
}

const FeaturedCard: React.FC<Props> = ({ image, title, description, onClick }) => {
  return (
    <div className="relative group cursor-pointer">
      <Image
        src={image}
        alt={title}
        className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
      />
      <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
        <p className="font-medium text-xl lg:text-2xl">{title}</p>
        <p className="text-sm lg:text-base leading-5 max-w-60">{description}</p>
        <button
          onClick={onClick}
          className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded"
        >
          Buy now{' '}
          <Image
            className="h-3 w-3"
            src={assets.redirect_icon}
            alt="Redirect Icon"
          />
        </button>
      </div>
    </div>
  )
}

export default FeaturedCard
