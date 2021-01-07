<template>
    <div class="form-group">
        <label>{{ label || "No label for select"  }}</label>
        <select
            class="form-control"
            v-bind:class="{
              'is-valid': !validator.$error && validator.$dirty,
              'is-invalid': validator.$error
            }"
            v-on:change="$emit('input', $event.target.value)"
        >
            <option
                selected
                disabled
            />
            <option
                v-for="opt in options"
                v-bind:key="opt.value"
                v-bind:selected="opt.value == value"
                v-bind:value="opt.value"
            >
            {{ opt.label || "No label for option" }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true,
            validator(opts) {
                return !opts.find(opt => typeof opt !== "object")
            }
        },
        value: {
            type: String,
            required: true
        },
        validator: {
            type: Object,
            required: false,
            validator: function($v) {
                return Object.prototype.hasOwnProperty.call($v, "$model")
            }
        }
    }
}
</script>
