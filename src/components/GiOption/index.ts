import Option from './GiOption.vue'
import OptionItem from './GiOptionItem.vue'

export type OptionInstance = InstanceType<typeof Option>
export type OptionItemInstance = InstanceType<typeof OptionItem>
export * from './type'
export { Option as GiOption, OptionItem as GiOptionItem }
