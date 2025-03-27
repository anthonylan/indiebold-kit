import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite:{
    plugins: [
      tailwindcss()
    ]
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_KEY,
      clientBaseUrl: process.env.BASE_URL,
    },
    stripeSk: process.env.STRIPE_SK,
    supabaseRole: process.env.SUPABASE_ROLE,
    postMarkKey: process.env.POSTMARK_SK,
    senderEmail: process.env.SMTP_EMAIL
  },
  app: {
    head: {
      script: [
        {
          innerHTML: `
            (function() {
              const theme = localStorage.getItem("theme");
              if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            })();
          `,
          type: "text/javascript",
        },
      ],
    },
  },

})