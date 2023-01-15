module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NEXT_PUBLIC_BE === "https://ecommerce-shop-be.vercel.app"
      ? { cssnano: {} }
      : {}),
  },
};
