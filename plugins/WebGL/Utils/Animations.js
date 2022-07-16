import { gsap } from 'gsap'

export default class Animations {
  constructor () {
  }

  // UI
  fadeIn () {
    const projectList = document.querySelector('.project-list')
    const homeButton = document.querySelector('.home-button > button')

    const tl = gsap.timeline({
      onStart: () => {
        projectList.style.display = 'flex'
        projectList.style.opacity = 0
      },
      onComplete: () => { homeButton.style.display = 'none' }
    })

    tl.to(homeButton, {
      duration: 0.5,
      y: 20,
      ease: 'power4.easeOut',
      opacity: 0
    })
      .to(projectList, {
        duration: 1,
        y: 0,
        ease: 'power4.easeOut',
        opacity: 1
      })
  }

  fadeOut () {
    const projectList = document.querySelector('.project-list')
    const homeButton = document.querySelector('.home-button > button')

    const tl = gsap.timeline({
      onStart: () => { homeButton.style.display = 'block' },
      onComplete: () => { projectList.style.display = 'none' }
    })

    tl.to(projectList, {
      duration: 1,
      y: 100,
      ease: 'power4.easeOut',
      opacity: 0
    })
      .to(homeButton, {
        duration: 0.5,
        y: 0,
        ease: 'power4.easeOut',
        opacity: 1
      })
  }

  loaderFadeIn () {
    const header = document.querySelector('.header-container-item--name')

    gsap.to(header, {
      delay: 0.5,
      duration: 1,
      opacity: 1,
      ease: 'power1.easeInOut'
    })
  }

  loaderFadeOut (data) {
    const loaderText = document.querySelector('.loader-container')
    const loader = document.querySelector('.loader')

    const tl = gsap.timeline({
      onComplete: () => { data.endProgress = true }
    })

    tl.to(loaderText, {
      duration: 1,
      opacity: 0,
      ease: 'power1.easeInOut'
    })
      .to(loader, {
        duration: 1,
        opacity: 0,
        ease: 'power1.easeInOut'
      })
  }

  // WebGL
  openDoor (door, camera) {
    const tl = gsap.timeline({
      onComplete: () => {
        window.$nuxt.$store.$router.push({ path: '/projects' })
      }
    })

    tl.to(door.rotation, {
      duration: 2,
      y: 5 * Math.PI / 3,
      ease: 'power1.easeInOut'
    })

      .to(camera.position, {
        duration: 1.6,
        x: door.position.x,
        y: door.position.y + 3,
        z: door.position.z - 2,
        ease: 'power2.easeInOut'
        // onUpdate: () => camera.lookAt(camera.position)
      }, '-=1.6')

      .to(camera.rotation, {
        duration: 1.6,
        // x: Math.PI / 30,
        // y: -Math.PI / 25,F
        z: Math.PI / 6
      }, '-=1.5')
  }

  closeDoor (door, camera) {
    const tl = gsap.timeline({
      onStart: () => {
        window.$nuxt.$store.$router.push({ path: '/' })
      }
    })

    tl.to(camera.position, {
      duration: 2,
      x: -2,
      y: 3,
      z: 4,
      ease: 'power2.easeInOut'
    })

      .to(camera.rotation, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: 'power2.easeInOut'
      }, '-=1.9')

      .to(door.rotation, {
        duration: 1.5,
        y: 7 * Math.PI / 6,
        ease: 'power2.ease'
      }, '-=1.4')
  }
}
