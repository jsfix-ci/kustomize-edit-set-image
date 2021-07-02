import { Image } from './types'

function splitFirstPartsAndNewTag(directive: string): [string, string | null] {
  const lastIndexOfColon = directive.lastIndexOf(':')
  const lastIndexOfAt = directive.lastIndexOf('@')

  if (lastIndexOfColon < 0 && lastIndexOfAt < 0) {
    return [directive, null]
  }

  if (lastIndexOfAt > 0) {
    return [
      directive.substring(0, lastIndexOfAt),
      directive.substring(lastIndexOfAt + 1),
    ]
  }

  if (lastIndexOfColon > 0) {
    return [
      directive.substring(0, lastIndexOfColon),
      directive.substring(lastIndexOfColon + 1),
    ]
  }

  throw new Error('Invalid set image format. Unexpected image newTag')
}

function splitImageAndNewImage(directiveWithoutNewTag: string): [string, string | null] {
  const names = directiveWithoutNewTag.split('=')

  if (names.length == 1) {
    return [names[0], null];
  }

  if (names.length == 2) {
    return [names[0], names[1]];
  }

  throw new Error('Invalid set image format. Unexpected image name or newName');
}

export function parseSetImageDirective(directive: string): Image {
  const [ firstParts, newTag ] = splitFirstPartsAndNewTag(directive);
  const [ name, newName ] = splitImageAndNewImage(firstParts);

  if (!newName && !newTag) {
    throw new Error('Invalid set image format. At least newName or newTag required')
  }

  const image:Image = { name };
  if (newName) {
    image.newName = newName;
  }
  if (newTag) {
    image.newTag = newTag;
  }
  return image;
}
