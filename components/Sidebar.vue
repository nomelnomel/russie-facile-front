<template>
  <div v-if="sidebar" class="sidebar">
    <div v-if="sidebar.page === 'program'" class="sidebar-program">
      <div class="tarifs">
        <p class="mb-2 hidden lg:inline-block font-bold text-2xl">Tarifs</p>
        <div>
          de
          <span class="price">{{ sidebar.price_from }}</span>
          à
          <span class="price">{{ sidebar.price_to }} €</span>
        </div>
        <span class="text-xs hidden lg:block">par persone</span>
        <button v-scroll-to="{el: '#prices', offset: -500}"
                class="scroll-to-btn"
        >
          Voir les tarifs
        </button>
      </div>
      <div class="contacts">
        <p class="font-bold text-xl">Nous contacter</p>
        <div class="flex items-center gap-2">
          <phone/>
          <a href="tel:89111870292">89111870292</a>
        </div>
        <div class="flex items-center gap-2">
          <mail/>
          <a href="mailto:nomelnomel@gmail.com" target="_blank">Envoyer un mail</a>
        </div>
      </div>
      <div class="flex-col gap-4 hidden mb-2 lg:flex border-t mt-4 pt-4 w-full">
        <p class="font-bold text-xl">Réservez en tranquillité:</p>
        <div class="flex items-center gap-2">
          <check/>
          <span> Devis gratuit</span></div>
        <div class="flex items-center gap-2">
          <check/>
          <span>Prix en direct</span></div>
        <div class="flex items-center gap-2">
          <check/>
          <span>Voyage 100% personnalisable</span></div>
      </div>
      <div class="flex justify-center gap-2 lg:border-t lg:mt-4 lg:pt-4 lg:w-full">
        <button class="bg-bg-accent py-2 px-4 rounded-sm text-white font-bold lg:py-4 lg:px-8 lg:text-xl"
                @click="isPopup = true">Commander
        </button>
      </div>
    </div>
    <div v-if="sidebar.page === 'voyages'" class="text-center p-2">
      Voir aussi à
      <h3>{{ sidebar.name }}</h3>
      <nuxt-link :to="`/visites/${sidebar.slug}`"
                 class="mt-8 py-8 px-4 border border-black flex items-center justify-center">Visites
      </nuxt-link>
    </div>
    <div v-if="sidebar.page === 'visites'">
      Voir aussi à
      <h3>{{ sidebar.name }}</h3>
      <nuxt-link :to="`/voyages/${sidebar.slug}`"
                 class="mt-8 py-8 px-4 border border-black flex items-center justify-center">Voyages
      </nuxt-link>
    </div>
    <div v-if="sidebar.page === 'excursion'" class="sidebar-program">
      <div class="tarifs">
        <p class="mb-2 hidden lg:inline-block font-bold text-2xl">Tarifs</p>
        <div>
          de
          <span class="price">{{ sidebar.price_from }} €</span>
        </div>
        <span class="text-xs hidden lg:block">par persone</span>
        <button v-scroll-to="{el: '#prices', offset: -200}"
                class="scroll-to-btn"
        >
          Voir les tarifs
        </button>
      </div>
      <div class="contacts">
        <p class="font-bold text-xl">Nous contacter</p>
        <div class="flex items-center gap-2">
          <phone/>
          <a href="tel:89111870292">89111870292</a>
        </div>
        <div class="flex items-center gap-2">
          <mail/>
          <a href="mailto:nomelnomel@gmail.com" target="_blank">Envoyer un mail</a>
        </div>
      </div>
      <div class="flex-col gap-4 hidden mb-2 lg:flex border-t mt-4 pt-4 w-full">
        <p class="font-bold text-xl">Pourquoi réserver ici ?</p>
        <div class="flex items-center gap-2">
          <check/>
          <span>Guides professionnels</span></div>
        <div class="flex items-center gap-2">
          <check/>
          <span>Voitures confortables</span></div>
        <div class="flex items-center gap-2">
          <check/>
          <span>Prix justes</span></div>
      </div>
      <div class="flex justify-center gap-2 lg:border-t lg:mt-4 lg:pt-4 lg:w-full">
        <button class="bg-accent py-2 px-4 rounded-sm text-white font-bold lg:py-4 lg:px-8 lg:text-xl"
                @click="isPopup = true">Commander
        </button>
      </div>
    </div>
    <RequestPopup :is-popup="isPopup" :title="sidebar.title" @close="isPopup = false"/>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import RequestPopup from '~/components/RequestPopup'
import check from '~/components/svg-icons/check'
import phone from '~/components/svg-icons/phone'
import mail from '~/components/svg-icons/mail'

export default {
  name: 'Sidebar',
  components: {
    RequestPopup,
    check,
    phone,
    mail
  },
  data() {
    return {
      isPopup: false
    }
  },
  computed: {
    ...mapState('sidebar', ['sidebar']),
  },
}
</script>

<style scoped lang="scss">
.sidebar {
  min-width: 300px;
  @apply fixed bottom-0 left-0 w-full flex z-10 bg-gray-200 py-2 border-t border-black;

  @screen lg {
    @apply sticky block w-1/5 h-full mt-8 top-32 right-0 bg-transparent border-none;
  }

  &-program {
    @apply flex items-center justify-between w-full px-4;

    @screen lg {
      @apply flex-col p-4
    }

    .tarifs {

      @apply flex items-center flex-col;

      @screen lg {
        @apply bg-gray-200 border w-full py-8;
      }

      .price {
        @apply text-accent font-bold text-lg;

        @screen lg {
          @apply text-3xl
        }
      }
    }

    .contacts {
      @apply hidden;

      @screen lg {
        @apply flex flex-col gap-4 w-full mt-4;
      }
    }
  }

  .scroll-to-btn {
    @apply underline;

    @screen lg {
      @apply bg-accent py-2 px-4 rounded-sm text-white font-bold mt-2 no-underline;
    }
  }
}
</style>
