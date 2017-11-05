<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3>
        <v-card>
          <v-card-title primary-title class="primary">
            <h3 v-if="mode === 'SingUp'" class="mb-0 white--text"> Sign up </h3>
            <h3 v-if="mode === 'SingIn'" class="mb-0 white--text"> Sign in </h3>
          </v-card-title>
          <v-progress-linear v-if="isLoading" :indeterminate="true" height="2"></v-progress-linear>
          <app-alert v-if="error" @dismissed="onDismissed" :text="error"></app-alert>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onLogIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row v-if="mode === 'SingUp'">
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn color="primary" type="submit" :disabled="isLoading">
                      <span v-if="mode === 'SingUp'"> Sign up </span>
                      <span v-if="mode === 'SingIn'"> Sign in </span>
                    </v-btn>
                    <span> or </span>
                    <v-btn flat @click.native="onToggleLoginMode()" :disabled="isLoading">
                      <span v-if="mode === 'SingUp'"> Sign in </span>
                      <span v-if="mode === 'SingIn'"> Sign up </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters['auth/isLoggedIn']
      },
      error () {
        return this.$store.getters['auth/errorOnOperation']
      },
      isLoading () {
        return this.$store.getters['auth/isOperationPending']
      },
      mode () {
        return this.$store.getters['auth/mode']
      }
    },
    methods: {
      onToggleLoginMode () {
        this.$store.dispatch('auth/toggleLoginMode')
      },
      onLogIn () {
        const user = {strategy: 'local', email: this.email, password: this.password}
        if (this.mode === 'SingUp') {
          // TODO: Re-Implement this
          // this.$store.dispatch('user/signUp', user)
        } else if (this.mode === 'SingIn') {
          this.$store.dispatch('auth/authenticate', user)
        }
      },
      onDismissed () {
        // TODO: Re-Implement this
        // this.$store.dispatch('user/clearError')
      }
    }
  }
</script>
