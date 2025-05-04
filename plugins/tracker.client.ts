
export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabase()
  const store = useStore()

  let startTime = performance.now()
  let previousPath = window.location.pathname

  nuxtApp.hook('page:start', () => {
    // User is navigating away — calculate time spent on previous page
    const duration = performance.now() - startTime

    const ua = navigator.userAgent

    const browser = (() => {
      if (ua.includes('Firefox')) return 'Firefox'
      if (ua.includes('Edg')) return 'Edge'
      if (ua.includes('Chrome')) return 'Chrome'
      if (ua.includes('Safari')) return 'Safari'
      return 'Unknown'
    })()

    const device = (() => {
      if (/Mobi|Android/i.test(ua)) return 'Mobile'
      if (/Tablet|iPad/i.test(ua)) return 'Tablet'
      return 'Desktop'
    })()

    let country = 'Unknown'

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(json => {
        country = json.country_name || 'Unknown'

        saveEvent({
          user_id: store.user.id ?? null,
          views: {
            path: previousPath,
            browser,
            device,
            country,
            duration: Math.round(duration), // milliseconds
            referrer: document.referrer || null
          }
        })
        
      })

    // Reset timer for the next page
    startTime = performance.now()

    const saveEvent  = async (payload: any) => {
      const { user_id, views } =  payload;
      store.event?.views?.push(views)
      
      await supabase.from('events')
      .upsert({ user_id, views: store.event?.views, last_activity: Date.now() })
      .select()
    }
  })

  nuxtApp.hook('page:finish', () => {
    previousPath = window.location.pathname
  })
})

