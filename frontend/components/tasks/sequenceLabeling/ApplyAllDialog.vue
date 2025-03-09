<template>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>Apply to All Occurrences</v-card-title>
        <v-card-text>
          <p v-if="occurrenceCount > 0">
            Do you want to apply the label "{{ labelText }}" to all {{ occurrenceCount }} 
            other occurrences of <span class="font-weight-medium">"{{ highlightedText }}"</span>?
          </p>
          <p v-else>
            No other occurrences of this text were found in the document.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn 
            color="primary" 
            @click="applyToAll"
            :disabled="occurrenceCount === 0"
          >
            Apply to All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      labelText: {
        type: String,
        default: ''
      },
      labelId: {
        type: Number,
        default: 0
      },
      highlightedText: {
        type: String,
        default: ''
      },
      occurrenceCount: {
        type: Number,
        default: 0
      }
    },
  
    computed: {
      dialog: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    },
  
    methods: {
      applyToAll() {
        this.$emit('apply')
        this.dialog = false
      }
    }
  }
  </script>