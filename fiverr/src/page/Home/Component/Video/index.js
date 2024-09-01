import React, { useEffect } from "react";

const Video = () => {
  useEffect(() => {
    // Mute all videos and audios on the page
    document.querySelectorAll("video, audio").forEach((media) => {
      media.muted = true;
    });

    // Try to mute media inside iframes if possible
    document.querySelectorAll("iframe").forEach((iframe) => {
      try {
        const iframeDocument =
          iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.querySelectorAll("video, audio").forEach((media) => {
          media.muted = true;
        });
      } catch (e) {
        console.warn("Cannot access iframe content due to security policies.");
      }
    });
  }, []);

  return (
    <div className=" w-full h-full min-h-screen flex items-center justify-center p-8">
      <div className="relative w-[70%] h-[60%] rounded-2xl overflow-hidden">
        {/* Background video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl blur-2xl"
          preload="none"
          loop
          playsInline
          autoPlay
          muted
          src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9?autoplay=1&mute=1"
        ></video>

        {/* Foreground video */}
        <video
          className="relative z-10 w-full h-full object-cover rounded-2xl"
          preload="metadata"
          loop
          playsInline
          autoPlay
          muted
          src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9?autoplay=1&mute=1"
        ></video>
      </div>
    </div>
  );
};

export default Video;
