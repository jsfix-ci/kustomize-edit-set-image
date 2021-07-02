import { Command } from 'commander';
import { setImageInKustomizeViaCli } from './functions';

export function handleCli() {
  const program = new Command()

  program
    .version('0.1.0')
    .description('Add or update image in kustomize.yaml')
    .argument('<image>', 'Set image directive in image:version')
    .option('-C, --context [context]', 'Kustomization root path, that kustomization.yaml exists', '.')
    .action((image: string, options: any) => {
      try {
        setImageInKustomizeViaCli(image, options.context);
      } catch (err) {
        console.error(err.message)
      }
    });

  program.parse();
}
