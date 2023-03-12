import type { ExtractPropTypes, PropType } from 'vue';
import { commonProps } from '../../common';

export type TagType = 'primary' | 'success' | 'danger' | 'warning';

export const tagProps = {
  ...commonProps,
  color: { type: String, default: '' },
  textColor: { type: String, default: '' },
  type: {
    type: String as PropType<TagType>,
    default: 'default',
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  mark: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
};

export type TagProps = ExtractPropTypes<typeof tagProps>;
