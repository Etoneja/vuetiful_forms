<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input
            v-bind:value="value"
            v-bind:type="type"
            class="form-control"
            v-on:input="$emit('input', $event.target.value)"
        >
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
        }
    },

}
</script>
