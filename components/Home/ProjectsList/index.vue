<template>
  <div class="project-list">
    <div class="project-list-container">
      <p class="hoverable" @click="onClick(0)" v-text="'Galeries Lafayette'" />
      <p class="hoverable" @click="onClick(1)" v-text="'Abvent map'" />
      <p class="hoverable" @click="onClick(2)" v-text="'Send nudes'" />
      <p class="hoverable" @click="onClick(3)" v-text="'Chut, je suis la'" />
      <p class="hoverable" @click="onClick(4)" v-text="'Airmow'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsList',

  // async asyncData ({ $prismic, params, error }) {
  //   const document = await $prismic.api.getByUID('page', params.uid)

  //   if (document) {
  //     return { data: document.data }
  //   } else {
  //     error({ statusCode: 404, message: 'Page not found' })
  //   }
  // },

  data () {
    return {
      projects: [
        {
          title: 'Galeries Lafayette',
          description: 'Galeries Lafayettes Digital Fashion by EGONLAB is a true interactive journey into a revitalized wonderland. this project is also an invitation to try to win 3 bewitching digital goods.',
          src: 'videos/galeries.mp4',
          href: 'https://wonderland-digitalfashion.com/',
          textBtn: 'Visit the site'
        },

        {
          title: 'Abvent map',
          description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos eius odit ad expedita quisquam aliquam amet quod recusandae omnis, illum beatae iusto quo delectus corrupti esse deleniti voluptatibus.',
          src: 'videos/resellers-map.mp4',
          href: 'https://resellers.abvent.com/',
          textBtn: 'Visit the site'

        },

        {
          title: 'Send Nudes',
          description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos eius odit ad expedita quisquam aliquam amet quod recusandae omnis, illum beatae iusto quo delectus corrupti esse deleniti voluptatibus.',
          src: 'videos/send-nudes.mp4',
          href: 'https://sendnudes.netlify.app/',
          textBtn: 'Visit the site'

        },

        {
          title: 'Chut, je suis la',
          description: "Chut, je suis là is an interactive game created on Unity. The goal of this project is to explore a creepy environment to find a way to reactivate the electricity in the house of a young girl named Luna. The monster that wants to kill you doesn't like noise so you will have to emit sound during the experience if you want to survive",
          src: 'videos/chut.mp4',
          href: 'https://designinteractif.gobelins.fr/2020/09/10/oversight/',
          textBtn: 'Download the game'
        },

        {
          title: 'Airmow',
          description: 'Airmow is a young artist who produces electronic music, I had the opportunity to create a website for the release of his EP "Rupture".',
          src: 'videos/airmow.mp4',
          href: 'https://airmow.fr/',
          textBtn: 'Visit the site'
        }
      ]
    }
  },
  computed: {
    projectData () {
      return this.$store.state.webgl.projectData
    },
    projectNumber () {
      return this.$store.state.webgl.projectNumber
    }
  },

  mounted () {
  },
  methods: {
    onClick (projectNumber) {
      this.defineDataProject(projectNumber)
      this.$WebGL.environment.door.openDoor()
    },

    defineDataProject (projectNumber) {
      this.$store.commit('webgl/setProjectData', this.projects)
      this.$store.commit('webgl/setProjectNumber', projectNumber)
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />
