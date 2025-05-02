properties([
    parameters([
        choice(
            name: 'BRANCH',
            choices: getGitBranches(),
            description: 'Select the branch to build'
        )
    ])
])

node {
    stage('Clean workspace before build') {
        deleteDir()
    }

    stage('Checkout Code') {
        checkout([$class: 'GitSCM',
            branches: [[name: "*/${params.BRANCH}"]],
            userRemoteConfigs: [[
                url: 'https://github.com/nksmkj7/test-jenkin.git',
                credentialsId: 'for-companion-site'
            ]]
        ])

        env.GIT_COMMIT_HASH = sh(script: "git log -n 1 --pretty=format:'%h'", returnStdout: true).trim()
        echo "Checked out commit: ${env.GIT_COMMIT_HASH}"
    }

    stage('Build') {
        echo "Building branch ${params.BRANCH}"
    }

    stage('Lint') {
        echo 'Linting...'
    }

    stage('Test') {
        echo ' scripted Testing...'
    }
}

def getGitBranches() {
    def branches = []
    node {
        withCredentials([usernamePassword(credentialsId: 'for-companion-site', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
            def output = sh(
                script: """
                    curl -s -u ${GIT_USERNAME}:${GIT_PASSWORD} \
                    https://api.github.com/repos/nksmkj7/test-jenkin/branches | \
                    grep -o '"name": "[^"]*' | cut -d'"' -f4
                """,
                returnStdout: true
            ).trim()

            branches = output.tokenize('\n')
        }
    }

    if (branches.isEmpty()) {
        branches = ['main', 'develop'] // fallback
    }

    return branches
}
