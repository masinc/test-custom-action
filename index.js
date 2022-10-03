import process from 'node:process';
import child_process from 'node:child_process';
import path from 'node:path';

function init_action() {
    const repo = process.env['GITHUB_ACTION_REPOSITORY'];
    const repoUrl = process.env['GITHUB_SERVER_URL'] + '/' + repo;
    const dir = path.join('/tmp/', repo);
    const branch = 'main';

    child_process.execSync(`git clone --depth 1 --single-branch -b ${branch} ${repoUrl} ${dir}`);

    process.chdir(dir);

    child_process.execSync('npm ci');
    child_process.execSync('npm start');
}

init_action()
