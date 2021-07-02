import { copyFileSync, readFileSync } from 'fs';
import { setImageInKustomizeViaCli } from './functions';

const cases = [
  [
    'Update existing image in kustomization.yaml correctly',
    './resources/test-resources/test-1.kustomization.yaml',
    './resources/test-resources/test-1.expected.kustomization.yaml',
    'mongo:4.1.0',
  ],
  [
    'Update existing image in kustomization.yaml correctly and do not touch other images',
    './resources/test-resources/test-2.kustomization.yaml',
    './resources/test-resources/test-2.expected.kustomization.yaml',
    'rabbitmq:1.0.0',
  ],
  [
    'Creating new images section in kustomization.yaml correctly if not exists',
    './resources/test-resources/test-3.kustomization.yaml',
    './resources/test-resources/test-3.expected.kustomization.yaml',
    'mongo:4.1.0',
  ],
];

describe('Generated corrected kustomization.yaml', function() {
  test.each(cases)(
    '%p',
    (_, sourcePath, expectedResultPath, setImageDirective) => {
      copyFileSync(sourcePath, './storage/test-workspace/kustomization.yaml');
      setImageInKustomizeViaCli(setImageDirective, './storage/test-workspace');

      expect(
        readFileSync('./storage/test-workspace/kustomization.yaml', 'utf-8')
      ).toEqual(
        readFileSync(expectedResultPath, 'utf-8')
      )
    }
  );

})
