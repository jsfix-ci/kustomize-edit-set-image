# kustomize-edit-set-image

Replacement of `kustomize edit set image` that can be used with older kustomize versions.

## Usage

The easiest way to use the command is using `npx`.

```
npx kustomize-edit-set-image [-C context] <image>
```

## Examples

Set image `nginx` version to `1.9.2` in current kustomization directory.

```
npx kustomize-edit-set-image nginx:1.9.2
```

Set image `nginx` version to `1.9.2` in kustomization directory `./staging`.

```
npx kustomize-edit-set-image -C ./staging nginx:1.9.2
```
