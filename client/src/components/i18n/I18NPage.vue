<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <v-flex xs12 sm6>
              <h4 class="primary--text">Translations</h4>
            </v-flex>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
            <v-btn
              fab small color="primary"
              @click.native="onOpenCreateDialog"
              :disabled="this.isOperationPending"
            >
              <v-icon dark>add</v-icon>
            </v-btn>
            <v-dialog v-model="showCreateDialog">
              <v-card>
                <v-card-title class="primary white--text">
                  <h4 class="mb-0">New translation</h4>
                </v-card-title>
                <v-card-text>
                  <v-flex xs12>
                    <v-text-field
                      name="key"
                      label="Key"
                      id="key"
                      v-model="createdItem.key"
                      required></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-for="supportedLanguage in supportedLanguages" :key="supportedLanguage">
                    <v-text-field
                      :name=supportedLanguage
                      :label=supportedLanguage
                      :id=supportedLanguage
                      v-model="createdItem[supportedLanguage]"></v-text-field>
                  </v-flex>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat @click.stop="showCreateDialog=false">Close</v-btn>
                  <v-btn color="primary" @click.stop="onSaveCreateDialog">save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table
            :headers="tableHeaders"
            :items="translations"
            :search="search"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">
                {{ props.item.key }}
              </td>
              <td class="text-xs-right" v-for="supportedLanguage in supportedLanguages">
                <v-edit-dialog large lazy @open="onOpenEditDialog(props.item)" @save="onSaveEditDialog">
                  {{ props.item[supportedLanguage] ? props.item[supportedLanguage] : 'tbd' }}
                  <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="editedItem[supportedLanguage]"
                    single-line
                    counter
                  ></v-text-field>
                </v-edit-dialog>
              </td>
              <td class="text-xs-center">
                <v-btn
                  flat small icon color="error"
                  @click.native="onDeleteTranslation(props.item)"
                  :disabled="this.isOperationPending"
                >
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        createdItem: {},
        editedItem: {},
        showCreateDialog: false
      }
    },
    computed: {
      supportedLanguages () {
        return this.$store.getters['translations/supportedLanguages']
      },
      translations () {
        return this.$store.getters['translations/list']
      },
      tableHeaders () {
        const out = []
        out[0] = {
          text: 'key',
          value: 'key'
        }
        for (let i = 0; i < this.supportedLanguages.length; i++) {
          const supportedLanguage = this.supportedLanguages[i]
          out[i + 1] = {
            text: supportedLanguage,
            value: supportedLanguage
          }
        }
        return out
      },
      errorOnOperation () {
        return this.$store.getters['translations/errorOnOperation']
      },
      isOperationPending () {
        return this.$store.getters['translations/isOperationPending']
      }
    },
    methods: {
      onSaveEditDialog () {
        this.$store.dispatch('translations/update', this.editedItem)
      },
      onOpenEditDialog (item) {
        this.editedItem = Object.assign({}, item)
      },
      onSaveCreateDialog () {
        this.$store.dispatch('translations/create', this.createdItem)
          .then(() => {
            this.showCreateDialog = false
          })
      },
      onOpenCreateDialog () {
        this.createdItem = {}
        this.showCreateDialog = true
      },
      onDeleteTranslation (translation) {
        this.$store.dispatch('translations/remove', translation)
      }
    }
  }
</script>
