<template>
  <div id="app" class="container py-4">
    <div class="row">
      <div class="col-12">
        <form v-on:submit.prevent="onSubmit">

          <BaseInput label="First Name:" type="text" v-model="form.firstName" />
          <BaseInput label="Last Name:" type="text" v-model="form.lastName" />
          <BaseInput label="Email:" type="email" v-model="form.email" />

          <div class="form-group">
            <button 
              v-bind:disabled="!formIsValid"
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

import axios from "axios"

export default {
  name: 'App',
  data: function() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: ""
      }
    }
  },
  components: {
    BaseInput,
  },
  computed: {
    formIsValid: function() {
      return (
        this.form.firstName.length > 0 &&
        this.form.lastName.length > 0 &&
        this.form.email.length > 0
      );
    }
  },
  methods: {
    onSubmit: function() {
      if (!this.formIsValid) return
      axios.post("http://localhost:3000/dolphins", {params: this.form})
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
