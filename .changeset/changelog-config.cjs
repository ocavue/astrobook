// @ts-check

/** @type import('@changesets/types').GetReleaseLine */
async function getReleaseLine(changeset) {
  let returnVal = `- ` + formatCommit(changeset.commit)

  const lines = changeset.summary.split('\n').map((line) => line.trimEnd())

  for (const [index, line] of lines.entries()) {
    if (index === 0) {
      returnVal += line
    } else {
      returnVal += `\n  ` + line
    }
  }

  return returnVal + '\n'
}

/**
 * @param {string | null | undefined} commit
 */
function formatCommit(commit) {
  if (!commit || typeof commit !== 'string' || commit.length < 7) {
    return ''
  }

  const shortCommit = commit.slice(0, 7)

  return `[\`${shortCommit}\`](https://github.com/ocavue/astrobook/commit/${commit}) `
}

/** @type import('@changesets/types').GetDependencyReleaseLine */
async function getDependencyReleaseLine() {
  return ''
}

/** @type import('@changesets/types').ChangelogFunctions */
const functions = {
  getReleaseLine,
  getDependencyReleaseLine,
}

module.exports = functions
