import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Video, FileVideo, ArrowRight, Film } from 'lucide-react';
import { Helmet } from "react-helmet-async";
const converters = [{
  title: "Video to GIF Converter",
  description: "Convert your videos to animated GIF format",
  icon: <Video className="w-6 h-6" />,
  link: "/video-to-gif",
  color: "bg-purple-500"
}, {
  title: "Video Muter",
  description: "Remove audio from your videos easily",
  icon: <FileVideo className="w-6 h-6" />,
  link: "/mute-video",
  color: "bg-blue-500"
}, {
  title: "Video Trimmer",
  description: "Trim and cut your videos to the perfect length",
  icon: <Film className="w-6 h-6" />,
  link: "/video-trimmer",
  color: "bg-green-500"
}];
const VideoConverters = () => {
  return <>
      <Helmet>
        <title>Video Tools - Convert, Mute & Trim | Toolzenix</title>
        <meta name="description" content="Free online video tools: Video to GIF converter, video muter, and video trimmer. Process your videos quickly and securely in your browser." />
        <link rel="canonical" href="https://toolzenix.com/video-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Video Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert, mute, and trim your videos with perfect quality preservation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {converters.map((converter, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.05
        }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to={converter.link} className="block group">
                <div className="flex items-start space-x-4">
                  <div className={`${converter.color} p-3 rounded-lg text-white`}>
                    {converter.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500">
                      {converter.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {converter.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </Link>
            </motion.div>)}
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="mt-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Our Video Tools?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Fast & Free</h3>
              <p className="text-purple-100">Process your videos instantly without any cost</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">High Quality</h3>
              <p className="text-purple-100">Maintain optimal video quality after processing</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-purple-100">Your files are processed locally in your browser.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>;
};
export default VideoConverters;