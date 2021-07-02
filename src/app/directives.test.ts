import { parseSetImageDirective } from './directives'

test('parseSetImageDirective should parse set image directive in <image>:<newtag> correctly', function() {
  expect(parseSetImageDirective('nginx:1.9.2')).toEqual({
    name: 'nginx',
    newTag: '1.9.2'
  })
})

test('parseSetImageDirective should parse set image directive in <image>:<newtag> correctly, even if there is a colon in the image name', function() {
  expect(parseSetImageDirective('gitlab.self-hosted.com:4567/group/project:1.9.2')).toEqual({
    name: 'gitlab.self-hosted.com:4567/group/project',
    newTag: '1.9.2'
  })
})


test('parseSetImageDirective should parse set image directive in <image>@<newtag> correctly', function() {
  expect(parseSetImageDirective('nginx@1.9.2')).toEqual({
    name: 'nginx',
    newTag: '1.9.2'
  })
})

test('parseSetImageDirective should parse set image directive in <image>=<newimage>:<newtag> correctly, even if there is a colon in the image name', function() {
  expect(parseSetImageDirective('gitlab.self-hosted.com:4567/group/project=gitlab.self-hosted.com:4567/group/project-alpine:1.9.2')).toEqual({
    name: 'gitlab.self-hosted.com:4567/group/project',
    newName: 'gitlab.self-hosted.com:4567/group/project-alpine',
    newTag: '1.9.2'
  })
})

test('parseSetImageDirective should parse set image directive in <image>=<newimage>:<newtag> correctly', function() {
  expect(parseSetImageDirective('nginx=nginx-alpine:1.9.2')).toEqual({
    name: 'nginx',
    newName: 'nginx-alpine',
    newTag: '1.9.2'
  })
})

test('parseSetImageDirective should parse set image directive in <image>=<newimage>@<newtag> correctly', function() {
  expect(parseSetImageDirective('nginx=nginx-alpine@1.9.2')).toEqual({
    name: 'nginx',
    newName: 'nginx-alpine',
    newTag: '1.9.2'
  })
})

test('parseSetImageDirective should parse set image directive in <image>=<newimage> correctly', function() {
  expect(parseSetImageDirective('nginx=nginx-alpine')).toEqual({
    name: 'nginx',
    newName: 'nginx-alpine'
  })
})
