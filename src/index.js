import core from '@actions/core'
import github from '@actions/github'

async function run() {
  try {
    const commitMessage = core.getInput('commitMessage')
    core.info(`The commit message is ${commitMessage}...`)

    core.info(new Date().toTimeString())
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
