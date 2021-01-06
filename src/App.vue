<template>
  <div id="app" class="container py-4">
    <div class="row">
      <div class="col-12">
        <form v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>First Name:</label>
            <input v-model="form.firstName" type="text" class="form-control">
          </div>

          <div class="form-group">
            <label>Last Name:</label>
            <input v-model="form.lastName" type="text" class="form-control">
          </div>

          <div class="form-group">
            <label>Email:</label>
            <input v-model="form.email" type="email" class="form-control">
          </div>

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
