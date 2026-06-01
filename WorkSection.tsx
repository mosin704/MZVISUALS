import { useEffect, useState } from 'react';
import { Play, Film } from 'lucide-react';
import { store } from '../store/localStore';
import { Video } from '../types';
import { getThumbnailUrl } from '../utils/videoEmbed';

export default function WorkSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    const unsub = store.subscribe<Video>('videos', (data) => {
      setVideos(data);
    });
    return unsub;
  }, []);

  return (
    <section id="work" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-4">
            <Film className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Our Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Work That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Speaks
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Every frame tells a story. Explore our cinematic work across brands, reels, and beyond.
          </p>
        </div>

        {/* Videos grid */}
        {videos.length === 0 ? (
          <div className="text-center py-20">
            <Film className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">No videos available yet.</p>
            <p className="text-zinc-600 text-sm">Check back soon for our latest work.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const thumb = getThumbnailUrl(video.embedUrl);
              return (
                <div
                  key={video.id}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10"
                  onClick={() => setActiveVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <Film className="w-12 h-12 text-zinc-600" />
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/40 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-zinc-950 fill-zinc-950 ml-1" />
                      </div>
                    </div>
                    {/* Category badge */}
                    {video.category && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-zinc-950 text-xs font-bold px-2 py-1 rounded-md">
                        {video.category}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-base mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-zinc-500 text-sm line-clamp-2">{video.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-bold text-xl">{activeVideo.title}</h3>
                {activeVideo.description && (
                  <p className="text-zinc-400 text-sm">{activeVideo.description}</p>
                )}
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors ml-4"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`${activeVideo.embedUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
