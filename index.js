import process from 'node:process';
import child_process from 'node:child_process';
import path from 'node:path';

/**
 * @param {string[]} commands
 * @return {Promise<void>}
 */
async function exec(commands) {
    const [cmd, ...args] = commands;

    return new Promise((resolve, reject) => {
        const spawn = child_process.spawn(cmd, args);
        spawn.stdout.on("data", (chunk) => {
            process.stdout.write(chunk.toString());
        })

        spawn.stderr.on("data", (chunk) => {
            process.stderr.write(chunk.toString());
        });

        spawn.on('close', (code) => {
            if ((code ?? 0) === 0) {
                resolve();
            } else {
                reject(`error code: ${code}`)
            }
        });

        spawn.on('error', (err) => {
            reject(err);
        });
    });
}

async function init_action() {
    const repo = process.env['GITHUB_ACTION_REPOSITORY'];
    const repoUrl = process.env['GITHUB_SERVER_URL'] + '/' + repo;
    const dir = path.join('/tmp/', repo);
    const branch = 'main';
    const runtime = process.env['INPUT_RUNTIME'] ?? 'zx';

    await exec(['git', 'clone', '--depth=1', '--single-branch', '--branch', branch, repoUrl, dir]);

    process.chdir(dir);

    await exec(['npm', 'ci']);
    await exec(['npm', 'run', runtime])
}

init_action().catch((e) => {
    console.error(e);
    process.exit(1);
})
