import { useRef, useState } from "react"
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "./Button"

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [upcomingVideoIndex, setUpcomingVideoIndex] = useState(2) // Added state for upcoming video
  const [hasClicked, setHasClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideo, setLoadedVideo] = useState(0)

  const totalVideos = 4
  const nextVideoRef = useRef(null)

  /**
   * Using a function as the state setter ensures that the update is based on
   * the latest state value, avoiding potential issues with stale or outdated
   * state caused by React's asynchronous state batching. This approach is
   * particularly useful when the new state depends on the previous state.
   */
  const handleMiniVideoClick = () => {
    setHasClicked(true)

    const newCurrentIndex = (currentIndex % totalVideos) + 1
    const newUpcomingVideoIndex = (newCurrentIndex % totalVideos) + 1

    setCurrentIndex(newCurrentIndex)
    setUpcomingVideoIndex(newUpcomingVideoIndex)

    console.log(`Upcoming video: ${getVideoSource(newUpcomingVideoIndex)}`)
  }

  const handleVideoLoad = () => {
    setLoadedVideo((prev) => prev + 1)
  }

  const getVideoSource = (index) => `videos/hero-${index}.mp4`

  useGSAP(() => {
    if (hasClicked) {
      gsap.set('#next-video', { visibility: "visible" })

      gsap.to('#next-video',
        {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => nextVideoRef.current.play()
        }
      )
      gsap.from(
        '#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration1: 1.5,
        ease: 'power1.inOut',
      })
    }
  }, { dependencies: [currentIndex], revertOnUpdate: true })

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleMiniVideoClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              <video
                className="size-64 origin-center scale-150 object-cover object-center"
                loop
                ref={nextVideoRef}
                src={getVideoSource(upcomingVideoIndex)} // Use upcomingVideoIndex for the next video
                muted
                id="current-video"
                preload="auto"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSource(currentIndex)}
            loop
            muted
            preload="auto"
            id="next-video"
            onLoadedData={handleVideoLoad}
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />
          <video
            src={getVideoSource(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            preload="auto"
            muted
            onLoadedData={handleVideoLoad}
            className="absolute left-0 top-0 size-full object-cover object-center "
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-blue-75 z-40">G<b>a</b>ming</h1>
        <div className="absolute left-0 top-0 size-full z-40">
          <div className="mt-24 px-5 sm:px-10">
            <h1
              className="special-font hero-heading text-blue-100"
            >redefi<b>n</b>e</h1>
            <p className=" pb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">G<b>a</b>ming</h1>
    </div>
  )
}

export default Hero
