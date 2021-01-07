<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input
            v-bind:value="value"
            v-bind:type="type"
            class="form-control"
            v-bind:class="{
              'is-valid': !validator.$error && validator.$dirty,
              'is-invalid': validator.$error
            }"
            v-on:input="$emit('input', $event.target.value)"
            v-mask="mask"
        />
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "test",
            validator(value) {
                return [
                    "text",
                    "email",
                    "password"
                ].includes(value);
            }
        },
        value: {
            type: String,
            required: true
        },
        mask: {
            type: String,
            required: false
        },
        validator: {
            type: Object,
            required: false,
            validator: function($v) {
                return Object.prototype.hasOwnProperty.call($v, "$model")
            }
        }
    },

}
</script>
