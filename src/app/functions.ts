import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import YAML from 'yaml';
import { Image } from './types';
import { parseSetImageDirective } from './directives'

export { Image } from './types';

function makeImagesWithUpdatedImage(
  images: Image[],
  updatedImage: Image
): Image[] {
  images = images || Array<Image>();

  const { newImages, matchedImageUpdated } = images.reduce(
    function(context, image) {
      if (image.name === updatedImage.name) {
        context.newImages.push(updatedImage);
        context.matchedImageUpdated = true;
      } else {
        context.newImages.push(image);
      }
      return context;
    },
    {
      newImages: Array<Image>(),
      matchedImageUpdated: false,
    },
  );

  if (!matchedImageUpdated) {
    newImages.push(updatedImage)
  }

  return newImages
}

export function setImageInKustomize(
  newImage: Image,
  kustomizationFilePath: string,
) {
  const kustomizeFullFilePath = resolve(kustomizationFilePath);
  const kustomizeString = readFileSync(kustomizeFullFilePath, 'utf8');

  const kustomizeObject: any = YAML.parse(kustomizeString)
  const updatedKustomizeObject = {
    ...kustomizeObject,
    images: makeImagesWithUpdatedImage(
      kustomizeObject.images,
      newImage
    ),
  };

  const updatedKustomizeString = YAML.stringify(updatedKustomizeObject);
  writeFileSync(
    kustomizationFilePath,
    updatedKustomizeString,
    {
      encoding: 'utf8',
    },
  );
}

export function setImageInKustomizeViaCli (
  newImageDirective: string | undefined,
  kustomizationContextPath: string | undefined
) {
  if (!newImageDirective) {
    throw new Error('Invalid directive');
  }
  const newImage = parseSetImageDirective(newImageDirective);

  var kustomizationFilePath = resolve('./kustomization.yaml');
  if (kustomizationContextPath) {
    kustomizationFilePath = resolve(`${kustomizationContextPath}/kustomization.yaml`)
  }

  if (!existsSync(kustomizationFilePath)) {
    throw new Error(`Kustomization file path not exists [${kustomizationFilePath}]`)
  }

  setImageInKustomize(
    newImage,
    kustomizationFilePath,
  );
}
