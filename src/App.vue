<template>
  <div id="app" class="container py-4">

    <TheHeader />

    <div class="row">
      <div class="col-12">
        <form v-on:submit.prevent="onSubmit">

          <BaseInput
            label="First Name:"
            v-bind:value="$store.state.user.firstName"
            v-bind:validator="$v.form.firstName"
            v-on:input="updateUser('firstName', $event)"
          />
          <BaseInput
            label="Last Name:"
            v-bind:value="$store.state.user.lastName"
            v-bind:validator="$v.form.lastName"
            v-on:input="updateUser('lastName', $event)"
          />
          <BaseInput
            label="Phone:"
            v-bind:mask="'(###)###-##-##'"
            v-bind:value="$store.state.user.phone"
            v-bind:validator="$v.form.phone"
            v-on:input="updateUser('phone', $event)"
          />
          <BaseInput
            label="Email:" 
            type="email"
            v-bind:value="$store.state.user.email"
            v-bind:validator="$v.form.email"
            v-on:input="updateUser('email', $event)"
          />
          <BaseInput
            label="Website:"
            v-bind:value="$store.state.user.website"
            v-bind:validator="$v.form.website"
            v-on:input="updateUser('website', $event)"
          />

          <BaseSelect
            label="What you think about Vue?"
            v-bind:options="loveOptions"
            v-bind:value="$store.state.user.love"
            v-bind:validator="$v.form.love"
            v-on:input="updateUser('love', $event)"
          />

          <div class="form-group">
            <button
              v-bind:disabled="$v.$error"
              v-on:click.prevent="onSubmit"
              type="submit" 
              class="btn btn-primary"
            >Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput"
import BaseSelect from "@/components/BaseSelect"
import TheHeader from "@/components/TheHeader"

import { alpha, required, email, url } from "vuelidate/lib/validators"
import axios from "axios"
import { mapState } from "vuex"

export default {
  name: 'App',
  data: function() {
    return {
      loveOptions: [
        {label: "good", value: "good"},
        {label: "ok", value: "ok"},
        {label: "bad", value: "bad"},
      ]
    }
  },
  validations: {
    form: {
      firstName: {
        alpha, required
      },
      lastName: {
        alpha, required
      },
      email: {
        email, required
      },
      phone: {
        validatePhone: function(phone) {
          return phone.match(/^\(\d{3}\)\d{3}-\d{2}-\d{2}$/) !== null
        }
      },
      website: {
        url
      },
      love: {
        required
      }
    }
  },
  components: {
    BaseInput,
    BaseSelect,
    TheHeader
  },
  computed: {
    ...mapState({form: "user"}),
  },
  methods: {
    updateUser: function(property, value) {
      this.$store.dispatch("updateUserData", {
        property: property,
        value: value
      });

      this.$v.form[property].$touch();
    },
    onSubmit: function() {
      this.$v.$touch()
      if (this.$v.$invalid) return;

      axios.post("http://localhost:3000/dolphins", {
        params: this.form
      })
        .then(response => {
          console.log("form has been submitted", response)
        })
        .catch(err => {
          console.log("some error happen", err)
        })
    }
  },
  created: function() {
    this.$store.dispatch("getLoggedInUser")
  }
}
</script>
