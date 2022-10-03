import 'zx/globals';
cd($.env['GITHUB_WORKSPACE']);

console.log((await $`cat package.json`).stdout);
