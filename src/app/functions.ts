import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import YAML from 'yaml';
import { Kustomization, Image } from './types';
import { parseSetImageDirective } from './directives';

export { Image } from './types';

function makeImagesWithUpdatedImage(
  images: Image[] | undefined,
  updatedImage: Image,
): Image[] {
  const existingImages = images || Array<Image>();

  const { newImages, matchedImageUpdated } = existingImages.reduce(
    (context, image) => {
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
    newImages.push(updatedImage);
  }

  return newImages;
}

export function setImageInKustomize(
  newImage: Image,
  kustomizationFilePath: string,
): void {
  const kustomizeFullFilePath = resolve(kustomizationFilePath);
  const kustomizeString = readFileSync(kustomizeFullFilePath, 'utf8');

  const kustomizeObject: Kustomization = YAML.parse(kustomizeString);
  const updatedKustomizeObject = {
    ...kustomizeObject,
    images: makeImagesWithUpdatedImage(
      kustomizeObject.images,
      newImage,
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

export function setImageInKustomizeViaCli(
  newImageDirective: string,
  kustomizationContextPath: string | undefined,
): void {
  const newImage = parseSetImageDirective(newImageDirective);

  let kustomizationFilePath = resolve('./kustomization.yaml');
  if (kustomizationContextPath) {
    kustomizationFilePath = resolve(`${kustomizationContextPath}/kustomization.yaml`);
  }

  if (!existsSync(kustomizationFilePath)) {
    throw new Error(`Kustomization file path not exists [${kustomizationFilePath}]`);
  }

  setImageInKustomize(
    newImage,
    kustomizationFilePath,
  );
}
