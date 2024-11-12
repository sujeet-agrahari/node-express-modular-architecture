const logRoutes = (app) => {
  if (!app._router) {
    console.error('No routes found on the app.')
    return
  }

  app._router.stack.forEach((middleware) => {
    if (middleware.route) { // Routes registered directly on the app
      const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase()
      console.log(`${methods} ${middleware.route.path}`)
    } else if (middleware.name === 'router') { // Router middleware
      middleware.handle.stack.forEach((handler) => {
        const methods = Object.keys(handler.route.methods).join(', ').toUpperCase()
        console.log(`${methods} ${handler.route.path}`)
      })
    }
  })
}

export default logRoutes
