#!/usr/bin/env node
import { handleCli } from './app';

export {
  Image,
  setImageInKustomize,
} from './app';

export default function main(): void {
  handleCli();
}

if (require.main === module) {
  main();
}
