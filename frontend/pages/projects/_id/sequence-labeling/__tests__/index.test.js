import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SequenceLabelingPage from '../index'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SequenceLabelingPage', () => {
  let wrapper
  let store
  let actions
  let $services
  
  beforeEach(() => {
    // Mock the services used by the component
    $services = {
      sequenceLabeling: {
        list: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
        findAllTextOccurrences: jest.fn().mockReturnValue([[0, 5], [10, 15]]),
        createForAllOccurrences: jest.fn().mockResolvedValue(1)
      }
    }
    
    // Mock the Vuex store
    actions = {
      getProjectById: jest.fn(),
      getDocumentById: jest.fn().mockResolvedValue({
        id: 1,
        text: 'John went to Paris. John had fun.',
      })
    }
    
    store = new Vuex.Store({
      modules: {
        projects: {
          namespaced: true,
          state: {
            current: {
              id: 1,
              name: 'Test Project'
            }
          },
          getters: {
            spans: () => [],
            spanTypes: () => [
              { id: 1, text: 'Person', color: '#FF0000' }
            ]
          }
        },
        documents: {
          namespaced: true,
          state: {
            docs: {
              count: 10
            },
            current: {
              id: 1,
              text: 'John went to Paris. John had fun.'
            }
          }
        }
      }
    })

    wrapper = shallowMount(SequenceLabelingPage, {
      localVue,
      store,
      mocks: {
        $services,
        $route: {
          params: { id: '1' }
        },
        $toasted: {
          show: jest.fn()
        }
      },
      stubs: ['layout-text', 'apply-all-dialog']
    })
  })

  test('addSpan method opens dialog when multiple occurrences found', async () => {
    await wrapper.vm.addSpan(0, 4, 1) // Add "John"
    
    expect(wrapper.vm.showApplyAllDialog).toBe(true)
    expect(wrapper.vm.occurrenceCount).toBe(1) // One additional occurrence
    expect(wrapper.vm.highlightedText).toBe('John')
    expect($services.sequenceLabeling.create).toHaveBeenCalledWith('1', 1, 1, 0, 4)
  })

  test('applyLabelToAllOccurrences creates spans for all occurrences', async () => {
    wrapper.vm.selectedLabel = { id: 1, text: 'Person' }
    wrapper.vm.highlightedText = 'John'
    
    await wrapper.vm.applyLabelToAllOccurrences()
    
    expect($services.sequenceLabeling.createForAllOccurrences).toHaveBeenCalledWith(
      '1', 1, 1, 'John', 'John went to Paris. John had fun.', true
    )
    expect(wrapper.vm.$toasted.show).toHaveBeenCalled()
  })
})