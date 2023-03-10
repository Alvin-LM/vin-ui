import { mount } from '@vue/test-utils';
import CellGroup from '../index.vue';

test('should render title、desc slot correctly', () => {
  const wrapper = mount(CellGroup, {
    slots: {
      title: () => 'Custom Title',
      desc: () => 'Custom Desc',
    },
  });
  expect(wrapper.html()).toMatchSnapshot();
});
