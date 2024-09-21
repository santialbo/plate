import { createPluginFactory } from '@udecode/plate-common';

import { ImagePlugin } from './types';
import { withImage } from './withImage';

export const ELEMENT_IMAGE = 'img';

/**
 * Enables support for images.
 */
export const createImagePlugin = createPluginFactory<ImagePlugin>({
  key: ELEMENT_IMAGE,
  isElement: true,
  isVoid: true,
  dangerouslyAllowAttributes: ['alt', 'width', 'height'],
  withOverrides: withImage,
  then: (editor, { type }) => ({
    deserializeHtml: {
      rules: [
        {
          validNodeName: 'IMG',
        },
      ],
      getNode: (el) => ({
        type,
        url: el.getAttribute('src'),
      }),
    },
  }),
});
