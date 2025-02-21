import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    register_url: '/register',
    login_url: '/login',
    home_url: '/home'
  },
  video: false,
  viewportWidth: 1000,
  viewportHeight: 660,

  e2e: {
    specPattern: 'cypress/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    pageLoadTimeout: 30000,
    supportFile: false
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
})
