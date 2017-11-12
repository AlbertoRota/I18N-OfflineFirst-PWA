<template>
  <v-app light>
    <v-toolbar dark dense class="primary" fixed>
      <v-toolbar-title>
        <v-icon dark>translate</v-icon>
        I18N
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-if="isOffline">
          <v-badge color="warning">
            <span slot="badge">!</span>
            <v-icon>signal_wifi_off</v-icon>
          </v-badge>
        </v-btn>
        <v-btn flat>
          <v-badge color="info">
            <span slot="badge">2</span>
            <v-icon>cloud_upload</v-icon>
          </v-badge>
        </v-btn>
        <v-dialog v-if="isLoggedIn" v-model="logOutDialog" persistent>
          <v-btn dark flat slot="activator">
            <v-icon left>exit_to_app</v-icon>
            <span class="hidden-xs-only">LogOut</span>
          </v-btn>
          <v-card>
            <v-card-title primary-title class="primary">
              <h4 class="mb-0 white--text">LogOut?</h4>
            </v-card-title>
            <v-card-text>If you log out now, you will be unable to use the app in Off-line mode uptil you log in again while On-line</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark @click.native="logOutDialog = false">Keep me logged in</v-btn>
              <v-btn color="error" flat @click.native="logOutDialog = false; onLogOut()">Log me out</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>
    </v-toolbar>
    <main class="mt-5">
      <v-slide-y-reverse-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-reverse-transition>
    </main>
    <v-footer fixed app>
      <span>&copy; 2017</span>
      <v-spacer></v-spacer>
      <a
        rel="license"
        href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
      >
        <img
          alt="Creative Commons License"
          style="border-width:0"
          src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png"
        />
      </a>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        logOutDialog: false
      }
    },
    computed: {
      isLoggedIn () {
        return this.$store.getters['auth/isLoggedIn']
      },
      isOffline () {
        return this.$store.getters['offline/isOffline']
      }
    },
    watch: {
      isLoggedIn (newVal) {
        if (newVal === true) {
          this.$router.replace({name: 'I18NPage'})
        } else {
          this.$router.replace({name: 'LogIn'})
        }
      },
      isOffline (newVal) {
        if (newVal === false) {
          this.$store.dispatch('translations/find')
        }
      }
    },
    methods: {
      onLogOut () {
        if (this.isOffline) {
          this.$store.dispatch('offline/addOfflineOperation', {type: 'auth/logout'})
          this.$store.commit('auth/logout')
        } else {
          this.$store.dispatch('auth/logout')
        }
      }
    },
    mounted () {
      if (this.isOffline) {
        this.$store.dispatch('offline/addOfflineOperation', {type: 'auth/authenticate'})
      } else {
        this.$store.dispatch('auth/authenticate').catch(() => this.$store.commit('auth/clearAuthenticateError'))
        this.$store.dispatch('translations/find')
      }
    }
  }
</script>
