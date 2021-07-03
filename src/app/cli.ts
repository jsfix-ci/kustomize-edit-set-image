/* eslint no-console: "off" */
/* (Need to use console to print errors to CLI) */

import { Command } from 'commander';
import { setImageInKustomizeViaCli } from './functions';

interface CommandOption {
  context: string
}

export function handleCli(): void {
  const program = new Command();

  program
    .name(process.env.npm_package_name || 'kustomize-edit-set-image')
    .version(process.env.npm_package_version || 'dev')
    .description('Add or update image in kustomize.yaml')
    .argument('<image>', 'Set image directive in image:version')
    .option('-C, --context [context]', 'Kustomization root path, that kustomization.yaml exists', '.')
    .action((image: string, options: CommandOption) => {
      try {
        setImageInKustomizeViaCli(image, options.context);
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    });

  program.parse();
}

export default handleCli;
