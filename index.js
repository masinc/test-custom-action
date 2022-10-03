import process from 'node:process';
import child_process from 'node:child_process';
import path from 'node:path';
import core from '@actions/core'

function init_action() {
    const repo = process.env['GITHUB_ACTION_REPOSITORY'];
    const repoUrl = process.env['GITHUB_SERVER_URL'] + '/' + repo;
    const dir = path.join('/tmp/', repo);
    const branch = 'main';
    const runtime = process.env['INPUT_RUNTIME'] ?? 'zx';

    console.log(child_process.execSync(`git clone --depth 1 --single-branch -b ${branch} ${repoUrl} ${dir}`).toString());

    console.log(child_process.execSync('npm ci').toString());
    console.log(child_process.execSync(`npm run ${runtime}`).toString());
}

init_action()
