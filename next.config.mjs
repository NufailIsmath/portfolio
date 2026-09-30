/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // For GitHub Pages under /<repo>, set basePath: "/<repo>"
};
export default nextConfig;
