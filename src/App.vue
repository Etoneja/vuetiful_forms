<template>
  <div id="app" class="container py-4">
    <div class="row">
      <div class="col-12">
        <form v-on:submit.prevent="onSubmit">

          <BaseInput
            label="First Name:"
            type="text"
            v-model.trim="$v.form.firstName.$model"
            v-bind:validator="$v.form.firstName"
          />
          <BaseInput
            label="Last Name:"
            type="text"
            v-model.trim="$v.form.lastName.$model"
            v-bind:validator="$v.form.lastName"
          />
          <BaseInput
            label="Phone:"
            v-bind:mask="'(###)###-##-##'"
            type="text"
            v-model.trim="$v.form.phone.$model"
            v-bind:validator="$v.form.phone"
          />
          <BaseInput
            label="Email:" 
            type="email"
            v-model.trim="$v.form.email.$model"
            v-bind:validator="$v.form.email"
          />
          <BaseInput
            label="Website:"
            type="text"
            v-model.trim="$v.form.website.$model"
            v-bind:validator="$v.form.website"
          />

          <BaseSelect
            label="What you think about Vue?"
            v-bind:options="loveOptions"
            v-model="$v.form.love.$model"
            v-bind:validator="$v.form.love"
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

import { alpha, required, email, url } from "vuelidate/lib/validators"
import axios from "axios"

export default {
  name: 'App',
  data: function() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        website: "",
        love: ""
      },
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
  },
  computed: {},
  methods: {
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
  }
}
</script>
