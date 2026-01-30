/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "bersache.com", pathname: "/**" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com", pathname: "/**" },
      { protocol: "https", hostname: "www.thesoundfactor.com", pathname: "/**" },
      { protocol: "https", hostname: "assets.myntassets.com", pathname: "/**" },
      { protocol: "https", hostname: "www.yourprint.in", pathname: "/**" },
      { protocol: "https", hostname: "deq64r0ss2hgl.cloudfront.net", pathname: "/**" },
    ],
  },
};

export default nextConfig;
