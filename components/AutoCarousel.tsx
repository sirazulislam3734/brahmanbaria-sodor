"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Shield, Users, ArrowRight, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselSlide {
  id: number
  title: string
  titleHighlight?: string
  description: string
  bgGradient: string
  primaryButton: {
    text: string
    link: string
    icon: React.ReactNode
  }
  secondaryButton: {
    text: string
    link: string
    icon: React.ReactNode
  }
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "আপনার কণ্ঠস্বর",
    titleHighlight: "শুনুন",
    description: "স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে একটি উন্নত সমাজ গড়ে তুলুন। আপনার অভিযোগ ও গোপন তথ্য নিরাপদে জমা দিন।",
    bgGradient: "from-green-400 via-blue-500 to-purple-600",
    primaryButton: {
      text: "অভিযোগ জানান",
      link: "/complaint",
      icon: <FileText className="w-5 h-5" />,
    },
    secondaryButton: {
      text: "গোপন তথ্য দিন",
      link: "/spot-info",
      icon: <Shield className="w-5 h-5" />,
    },
  },
  {
    id: 2,
    title: "সমস্যার",
    titleHighlight: "সমাধান",
    description: "আপনার সমস্যা আমাদের সমস্যা। আমরা দ্রুত সমাধানের মাধ্যমে একটি উন্নত সমাজ গড়তে বদ্ধপরিকর।",
    bgGradient: "from-blue-500 via-purple-600 to-pink-500",
    primaryButton: {
      text: "সফলতার গল্প",
      link: "/#success-stories",
      icon: <Users className="w-5 h-5" />,
    },
    secondaryButton: {
      text: "অভিযোগ জানান",
      link: "/complaint",
      icon: <FileText className="w-5 h-5" />,
    },
  },
  {
    id: 3,
    title: "একযোগে",
    titleHighlight: "এগিয়ে যাই",
    description: "আমরা সবাই মিলে একটি স্বচ্ছ ও দুর্নীতিমুক্ত সমাজ গড়তে পারি। আপনার সহযোগিতা আমাদের শক্তি।",
    bgGradient: "from-purple-600 via-pink-500 to-red-500",
    primaryButton: {
      text: "আমাদের সেবা",
      link: "/#services",
      icon: <ArrowRight className="w-5 h-5" />,
    },
    secondaryButton: {
      text: "গোপন তথ্য দিন",
      link: "/spot-info",
      icon: <Shield className="w-5 h-5" />,
    },
  },
  {
    id: 4,
    title: "স্বচ্ছতার",
    titleHighlight: "প্রতিশ্রুতি",
    description: "আমাদের লক্ষ্য একটি স্বচ্ছ ও জবাবদিহিমূলক প্রশাসন। আপনার প্রতিটি অভিযোগ আমাদের কাছে গুরুত্বপূর্ণ।",
    bgGradient: "from-red-500 via-orange-500 to-yellow-500",
    primaryButton: {
      text: "যোগাযোগ করুন",
      link: "/#contact",
      icon: <ArrowRight className="w-5 h-5" />,
    },
    secondaryButton: {
      text: "গ্যালারি দেখুন",
      link: "/#gallery",
      icon: <Users className="w-5 h-5" />,
    },
  },
]

export default function AutoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const SLIDE_DURATION = 4000 // 4 seconds per slide
  const PROGRESS_INTERVAL = 50 // Update progress every 50ms

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100
        if (newProgress >= 100) {
          nextSlide()
          return 0
        }
        return newProgress
      })
    }, PROGRESS_INTERVAL)

    return () => clearInterval(progressTimer)
  }, [isPlaying, nextSlide])

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsPlaying(true)
  }

  return (
    <section
      className="relative h-[600px] md:h-[700px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-in-out",
              slide.bgGradient,
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
          />
        ))}
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="container mx-auto text-center max-w-5xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "transition-all duration-700 ease-out",
                index === currentSlide
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8 absolute inset-0 flex flex-col items-center justify-center",
              )}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                {slide.title}{" "}
                {slide.titleHighlight && <span className="text-yellow-300 animate-pulse">{slide.titleHighlight}</span>}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-gray-800 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link href={slide.primaryButton.link} className="flex items-center">
                    {slide.primaryButton.icon}
                    <span className="ml-2">{slide.primaryButton.text}</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-800 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Link href={slide.secondaryButton.link} className="flex items-center">
                    {slide.secondaryButton.icon}
                    <span className="ml-2">{slide.secondaryButton.text}</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          {/* Progress bars */}
          <div className="flex justify-center space-x-2 mb-4">
            {slides.map((_, index) => (
              <div
                key={index}
                className="relative w-16 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <div
                  className={cn(
                    "absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-300",
                    index === currentSlide ? "opacity-100" : "opacity-60",
                  )}
                  style={{
                    width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300"
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>

            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="text-white/80 text-sm font-medium">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Floating animation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
