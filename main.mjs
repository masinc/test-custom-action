import 'zx/globals';
cd($.env['GITHUB_WORKSPACE']);

console.log('::set-output name=rand::' + Math.random());
console.log((await $`cat package.json`).stdout);
