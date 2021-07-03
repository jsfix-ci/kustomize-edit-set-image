# kustomize-edit-set-image

[![Node.js CI](https://github.com/inoxth/kustomize-edit-set-image/actions/workflows/node.js.yml/badge.svg)](https://github.com/inoxth/kustomize-edit-set-image/actions/workflows/node.js.yml)

Replacement of `kustomize edit set image` that can be used with older kubect/kustomize versions.

## How it works

In the directory that has `kustomization.yaml`:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployments/my-project.yaml
images:
  - name: my-group/my-project
    newTag: 1.0.0
```

After running `npx kustomize edit set image my-group/my-project:1.0.0` in the directory:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployments/my-project.yaml
images:
  - name: my-group/my-project
    newTag: 1.1.0
```

## Usage

The easiest way to use the command is using `npx`.

```
npx kustomize-edit-set-image [--context=context] <image>
```

## Examples

Set image `nginx` version to `1.9.2` in current kustomization directory.

```
npx kustomize-edit-set-image nginx:1.9.2
```

Set image `nginx` version to `1.9.2` in kustomization directory `./staging`.

```
npx kustomize-edit-set-image --context=./staging nginx:1.9.2
```

## Why not just using `kustomize edit set image`?

Due to [this issue](https://github.com/kubernetes-sigs/kustomize/issues/1556),
You can't use `kustomize edit set image` if your kustomization.yaml is make use of `bases` feature,
unless you can using kubectl 1.21.

However, if you can't use kubectl 1.21 due to [version skew policy](https://kubernetes.io/releases/version-skew-policy/),
we can't get this fix. So we do this to done this job instead.
