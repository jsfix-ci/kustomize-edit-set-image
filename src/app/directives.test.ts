import { parseSetImageDirective } from './directives'

describe('parseSetImageDirective', function() {

  test('should parse set image directive in <image>:<newtag> correctly', function() {
    expect(parseSetImageDirective('nginx:1.9.2')).toEqual({
      name: 'nginx',
      newTag: '1.9.2'
    })
  })

  test('should parse set image directive in <image>:<newtag> correctly, even if there is a colon in the image name', function() {
    expect(parseSetImageDirective('gitlab.self-hosted.com:4567/group/project:1.9.2')).toEqual({
      name: 'gitlab.self-hosted.com:4567/group/project',
      newTag: '1.9.2'
    })
  })


  test('should parse set image directive in <image>@<newtag> correctly', function() {
    expect(parseSetImageDirective('nginx@1.9.2')).toEqual({
      name: 'nginx',
      newTag: '1.9.2'
    })
  })

  test('should parse set image directive in <image>=<newimage>:<newtag> correctly, even if there is a colon in the image name', function() {
    expect(parseSetImageDirective('gitlab.self-hosted.com:4567/group/project=gitlab.self-hosted.com:4567/group/project-alpine:1.9.2')).toEqual({
      name: 'gitlab.self-hosted.com:4567/group/project',
      newName: 'gitlab.self-hosted.com:4567/group/project-alpine',
      newTag: '1.9.2'
    })
  })

  test('should parse set image directive in <image>=<newimage>:<newtag> correctly', function() {
    expect(parseSetImageDirective('nginx=nginx-alpine:1.9.2')).toEqual({
      name: 'nginx',
      newName: 'nginx-alpine',
      newTag: '1.9.2'
    })
  })

  test('should parse set image directive in <image>=<newimage>@<newtag> correctly', function() {
    expect(parseSetImageDirective('nginx=nginx-alpine@1.9.2')).toEqual({
      name: 'nginx',
      newName: 'nginx-alpine',
      newTag: '1.9.2'
    })
  })

  test('should parse set image directive in <image>=<newimage> correctly', function() {
    expect(parseSetImageDirective('nginx=nginx-alpine')).toEqual({
      name: 'nginx',
      newName: 'nginx-alpine'
    })
  })

  test('should throw error if more than 2 image names provided', function() {
    const t = () => parseSetImageDirective('nginx=nginx-alpine=perl-alpine:1.9.2')
    expect(t).toThrowError()
  })

  test('should throw error if no new tag or new name provided', function() {
    const t = () => parseSetImageDirective('nginx')
    expect(t).toThrowError()
  })

  test('should throw error if only tag provided', function() {
    const t = () => parseSetImageDirective(':latest')
    expect(t).toThrowError()
  })

})
