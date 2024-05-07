// Auto play videos when they come into view:

const videos = Array.from(document.querySelectorAll('.vid-auto'))

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      entry.target.pause()
    } else {
      entry.target.play()
    }
  })
}, {})

videos.forEach(video => {
  videoObserver.observe(video)
})

document.addEventListener('DOMContentLoaded', function () {
  const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target
        // console.log('lazy loading ', lazyImage)
        lazyImage.src = lazyImage.dataset.src
        lazyImage.classList.remove('lzy_img')
        imgObserver.unobserve(lazyImage)
      }
    })
  })
  const arr = document.querySelectorAll('img.lzy_img')
  arr.forEach((v) => {
    imageObserver.observe(v)
  })
})

const thresholdArray = []
const sections = document.querySelectorAll('.project-section')
const anchors = document.querySelectorAll('.pn-item')
const anchorData = {}

let triggerPoint = window.innerHeight * 0.5

// Generate a nice little structure of all the nav anchors, just for easy DOM access later. Not necessary for this to work.
for (const anchor of anchors) {
  const id = anchor.getAttribute('href').split('#')[1]
  anchorData[id] = anchor
}

// Create threshold steps for every 1% percent of an observable's visbility.
// This can change to, say, 10%; if you want to try and squeeze better performance out of it.
for (let i = 0; i <= 100; i++) {
  thresholdArray.push(parseFloat((i * 0.01).toFixed(2)))
}

// Observer settings are set to the array of items from 0.0 to 1.0
const settings = {
  threshold: thresholdArray
}

let scrolledToKoda = 0
let scrolledToKostic = 0
let scrolledToGuidigo = 0
let scrolledToInside = 0
let scrolledToEcommerce = 0
let scrolledToVarious = 0
let openedAbout = 0

// The actial logic:
const observerCallback = (entries, target) => {
  for (const entry of entries) {
    // get nav item that's associated with the current observable entry:
    const navItem = anchorData[entry.target.id]
    const navItemName = entry.target.id

    // get the rect provided by the current observable entry:
    const rect = entry.boundingClientRect

    if (entry.isIntersecting) {
      if (rect.top < triggerPoint && rect.bottom > triggerPoint) {
        // essentially, if the top of the item is less than the trigger point,
        // and the bottom is greater than the trigger point… it's considered active.
        if (!navItem.classList.contains('is-selected')) {
          navItem.classList.add('is-selected')
          if (navItemName === 'koda' && scrolledToKoda === 0) {
            scrolledToKoda = 1
            window.fathom.trackGoal('CWRSXL2O', 0)
            console.log('scrolled to Koda')
          }
          if (navItemName === 'kostic' && scrolledToKostic === 0) {
            scrolledToKostic = 1
            window.fathom.trackGoal('FUPQKFBW', 0)
            console.log('scrolled to Kostic')
          }
          if (navItemName === 'guidigo' && scrolledToGuidigo === 0) {
            scrolledToGuidigo = 1
            window.fathom.trackGoal('TCB3KMZZ', 0)
            console.log('scrolled to Guidigo')
          }
          if (navItemName === 'inside' && scrolledToInside === 0) {
            scrolledToInside = 1
            window.fathom.trackGoal('EWUSPBTD', 0)
            console.log('scrolled to Inside')
          }
          if (navItemName === 'ecommerce' && scrolledToEcommerce === 0) {
            scrolledToEcommerce = 1
            window.fathom.trackGoal('XSC5AYNG', 0)
            console.log('scrolled to Ecommerce')
          }
          if (navItemName === 'various' && scrolledToVarious === 0) {
            scrolledToVarious = 1
            window.fathom.trackGoal('LRBLS03Y', 0)
            console.log('scrolled to Various')
          }
        }
      } else {
        // …otherwise we'll call it inactive.
        if (navItem.classList.contains('is-selected')) { navItem.classList.remove('is-selected') }
      }
    }
  }
}

// link it up
const observer = new IntersectionObserver(observerCallback, settings)

// start it up
const init = () => {
  for (const section of sections) {
    observer.observe(section)
  }

  // - Force-set the active classes on click.
  // - Just doing this in case anything doesn't "take" on scroll.
  // - IntersectionObserver is not foolproof, in that if you
  //   scroll too fast (or in some cases if you click an
  //   anchor link that doesn't actually animate a scroll),
  //   things could get sketchy.
  for (const anchor of anchors) {
    anchor.addEventListener('click', () => {
      for (const item of anchors) {
        item.classList.remove('is-selected')
      }
      anchor.classList.add('is-selected')
      const navItemName = anchor.getAttribute('href').split('#')[1]
      if (navItemName === 'koda' && scrolledToKoda === 0) {
        scrolledToKoda = 1
        window.fathom.trackGoal('CWRSXL2O', 0)
        console.log('scrolled to Koda')
      }
      if (navItemName === 'kostic' && scrolledToKostic === 0) {
        scrolledToKostic = 1
        window.fathom.trackGoal('FUPQKFBW', 0)
        console.log('scrolled to Kostic')
      }
      if (navItemName === 'guidigo' && scrolledToGuidigo === 0) {
        scrolledToGuidigo = 1
        window.fathom.trackGoal('TCB3KMZZ', 0)
        console.log('scrolled to Guidigo')
      }
      if (navItemName === 'inside' && scrolledToInside === 0) {
        scrolledToInside = 1
        window.fathom.trackGoal('EWUSPBTD', 0)
        console.log('scrolled to Inside')
      }
      if (navItemName === 'ecommerce' && scrolledToEcommerce === 0) {
        scrolledToEcommerce = 1
        window.fathom.trackGoal('XSC5AYNG', 0)
        console.log('scrolled to Ecommerce')
      }
      if (navItemName === 'various' && scrolledToVarious === 0) {
        scrolledToVarious = 1
        window.fathom.trackGoal('LRBLS03Y', 0)
        console.log('scrolled to Various')
      }
    })
  }

  window.addEventListener('resize', () => {
    // update trigger point:
    triggerPoint = window.innerHeight * 0.5
  })
}

init()

const openAboutBtn = document.querySelector('.open-about')
const closeAboutBtn = document.querySelector('.close-about')
const aboutWindow = document.querySelector('.about')
const bodyTag = document.querySelector('body')
openAboutBtn.addEventListener('click', (e) => {
  e.preventDefault()
  bodyTag.classList.add('overflow-hidden')
  openAboutBtn.classList.add('hidden')
  aboutWindow.classList.add('about-on')
  closeAboutBtn.classList.remove('hidden')
  closeAboutBtn.classList.add('flex')
  if (openedAbout === 0) {
    openedAbout = 1
    window.fathom.trackGoal('GNQRLUMU', 0)
  }
})
closeAboutBtn.addEventListener('click', (e) => {
  e.preventDefault()
  bodyTag.classList.remove('overflow-hidden')
  closeAboutBtn.classList.remove('flex')
  closeAboutBtn.classList.add('hidden')
  aboutWindow.classList.remove('about-on')
  openAboutBtn.classList.remove('hidden')
})
