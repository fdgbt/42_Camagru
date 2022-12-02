module.exports = {
  darkMode: 'class',
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      minHeight: {
        "screen/hf": "calc(100vh - 64px - 32px)",
        "screen/mhf": "calc(100vh - 64px - 48px)"
      },
      maxHeight: {
        "screen/hf": "calc(100vh - 64px - 32px - 16px - 16px)",
        "screen/mhf": "calc(100vh - 64px - 48px - 16px - 16px)",
      },
      height: {
        "screen/hf": "calc(100vh - 64px - 32px - 16px - 16px)",
        "screen/mhf": "calc(100vh - 64px - 48px - 16px - 16px)",
      },
      width: {
        "gap-4": "calc(50% - 0.5rem)",
      },
    },
  },
  plugins: [],
}
