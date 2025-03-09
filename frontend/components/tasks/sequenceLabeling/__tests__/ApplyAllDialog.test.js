import { shallowMount } from '@vue/test-utils'
import ApplyAllDialog from '../ApplyAllDialog'

describe('ApplyAllDialog', () => {
  const factory = (props = {}) => {
    return shallowMount(ApplyAllDialog, {
      propsData: {
        value: false,
        labelText: 'Person',
        labelId: 1,
        highlightedText: 'John',
        occurrenceCount: 3,
        ...props
      }
    })
  }

  it('renders correctly when there are occurrences', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Do you want to apply the label "Person" to all 3 other occurrences')
    expect(wrapper.text()).toContain('"John"')
  })

  it('disables apply button when there are no occurrences', () => {
    const wrapper = factory({ occurrenceCount: 0 })
    const applyButton = wrapper.findAll('v-btn-stub').at(1)
    expect(applyButton.attributes('disabled')).toBeTruthy()
  })

  it('emits apply event when apply button is clicked', async () => {
    const wrapper = factory()
    await wrapper.vm.applyToAll()
    expect(wrapper.emitted().apply).toBeTruthy()
    expect(wrapper.emitted().input[0]).toEqual([false]) // Dialog should close
  })

  it('closes dialog when cancel is clicked', async () => {
    const wrapper = factory({ value: true })
    wrapper.vm.dialog = false
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input[0]).toEqual([false])
  })
})