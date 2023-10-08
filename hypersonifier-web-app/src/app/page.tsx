"use client";

import Image from "next/image";
import thumb1 from "@/app/assets/img/thumbnails/1.png";
import thumb2 from "@/app/assets/img/thumbnails/2.png";
import thumb3 from "@/app/assets/img/thumbnails/3.png";
import thumb4 from "@/app/assets/img/thumbnails/4.png";
import thumb5 from "@/app/assets/img/thumbnails/5.png";
import thumb6 from "@/app/assets/img/thumbnails/6.png";
import Player from "./components/Player";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";

// @ts-ignore
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import compositeSketch from "./p5/compositeSketch";
import layer1Sketch from "./p5/layer1Sketch";
import layer2Sketch from "./p5/layer2Sketch";
import layer3Sketch from "./p5/layer3Sketch";
import layer4Sketch from "./p5/layer4Sketch";
import ImageTile from "./components/ImageTile";

export default function Home() {
  const [progress, setProgress] = useState<number>(10);
  const [selectedImage, setSelectedImage] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      <Navbar selectedImage={selectedImage} />
      <main className="flex min-h-screen flex-col px-24 pb-3 pt-14 justify-center bg-gray-950">
        <audio
          src={`assets/${selectedImage}/audio/final_sound.mp3`}
          ref={audioRef}
        ></audio>
        <div className="my-4 overflow-hidden flex flex-wrap rounded-xl justify-center">
          <div className="h-100 w-100 border border-gray-700">
            <NextReactP5Wrapper
              sketch={compositeSketch}
              progress={progress}
              selectedImage={selectedImage}
            />
          </div>

          <div className="grid grid-cols-2 justify-items-center shrink-0">
            <div className="h-25 w-25 border-2 border-gray-700 -ml-[1px]">
              <NextReactP5Wrapper
                sketch={layer1Sketch}
                progress={progress}
                index={1}
                selectedImage={selectedImage}
              />
            </div>
            <div className="h-25 w-25 border-2 border-gray-700 -ml-[2px]">
              <NextReactP5Wrapper
                sketch={layer2Sketch}
                progress={progress}
                index={2}
                selectedImage={selectedImage}
              />
            </div>
            <div className="h-25 w-25 border-2 border-gray-700 -ml-[2px] -mt-[2px]">
              <NextReactP5Wrapper
                sketch={layer3Sketch}
                progress={progress}
                index={3}
                selectedImage={selectedImage}
              />
            </div>
            <div className="h-25 w-25 border-2 border-gray-700 -ml-[2px] -mt-[2px] bg-orange-400">
              <NextReactP5Wrapper
                sketch={layer4Sketch}
                progress={progress}
                index={4}
                selectedImage={selectedImage}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-8 text-gray-300 ">
          <div className="flex gap-2 items-center">
            <span className="bg-[#ffffffdd] w-3 h-3 rounded-sm relative bottom-[1px]"></span>
            Composite
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-[rgb(200,_0,_0,.50)] w-3 h-3 rounded-sm relative bottom-[1px]"></span>
            3.4μm
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-[rgba(241,_194,_50,.60)] w-3 h-3 rounded-sm relative bottom-[1px]"></span>
            4.6μm
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-[rgb(104,_255,_0,.30)] w-3 h-3 rounded-sm relative bottom-[1px]"></span>
            12μm
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-[rgb(61,_133,_198,.60)] w-3 h-3 rounded-sm relative bottom-[1px]"></span>
            22μm
          </div>
        </div>
        <Player
          value={progress}
          setValue={setProgress}
          onScrub={(val) => {
            if (audioRef.current) {
              audioRef.current.currentTime = (val / 100) * 20;
            }
          }}
          onPlay={() => {
            console.log(audioRef.current);
            audioRef.current?.play();
          }}
          onPause={() => {
            audioRef.current?.pause();
          }}
          audioRef={audioRef}
          selectedImage={selectedImage}
        />
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-6 gap-8 lg:text-left mx-auto">
          <ImageTile
            image={thumb1}
            onClick={() => setSelectedImage(1)}
            isSelected={selectedImage === 1}
          />
          <ImageTile
            image={thumb2}
            onClick={() => setSelectedImage(2)}
            isSelected={selectedImage === 2}
          />
          <ImageTile
            image={thumb3}
            onClick={() => setSelectedImage(3)}
            isSelected={selectedImage === 3}
          />
          <ImageTile
            image={thumb4}
            onClick={() => setSelectedImage(4)}
            isSelected={selectedImage === 4}
          />
          <ImageTile
            image={thumb5}
            onClick={() => setSelectedImage(5)}
            isSelected={selectedImage === 5}
          />
          <ImageTile
            image={thumb6}
            onClick={() => setSelectedImage(6)}
            isSelected={selectedImage === 6}
          />
        </div>
        {/* <p>x: {progress}</p> */}
      </main>
    </>
  );
}
